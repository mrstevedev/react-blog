import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      marginTop: '0.4rem',
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
    },
    paperContent: {
      padding: '3rem 8rem',
      margin: '1rem 1rem 0 1rem',
      textAlign: 'left',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      height: '96%',
      '@media(max-width: 768px)': {
        padding: '3rem 2rem !important',      
        whiteSpace: 'normal !important'
      }
    },
    title: {
      flexGrow: 1,
    },
    postText: {
      padding: '0.4rem 0 1rem'
    },
    commentSection: {
        padding: '1rem 0',
        maxHeight: '624px',
        overflow: 'scroll'
    },
    commentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        '@media(max-width: 768px)': {
            display: 'initial',
            padding: '3rem 1rem !important',      
          }
    },
    comment: {
        margin: '0.2rem 0',
        padding: '1rem 2rem',
        borderRadius: '6px',
        transition: '0.4s ease',
        '&:nth-child(odd)': {
            backgroundColor: '#f7f7f7'
        },
        '&:hover': {
            backgroundColor: '#f7f7f7',
        },
        '@media(max-width: 415px)': {
            padding: '3rem 0',
            borderBottom: 'solid 1px #ccc',
            '&:last-child': {
                borderBottom: 'solid 1px transparent',
            },
            '&:nth-child(odd)': {
                backgroundColor: 'transparent'
            },
            '&:hover': {
                backgroundColor: 'transparent',
            },
          }
    },
    commentTxt: {
        padding: '0.5rem 0'
    },
    commentName: {
        display: 'flex',
        justifyContent: 'space-between',
        '@media(max-width: 768px)': {
            display: 'initial',
          }
    },
    commentBtn: {
        margin: '1rem 0'
    },
    postDate: {
        fontWeight: '500',
        fontSize: '12px'
    },
    showCount: {
        fontSize: '14px'
    },
    successMsg: {
        fontWeight: 'bold',
        color: 'cadetblue',
        padding: '2rem 0'
    }
  }));

function Comment(props) {
    const classes = useStyles();
    const { post, comments } = props;
    const count = comments.filter(
        (comment) => comment.post_id === post.id).length;
    return(
        <Fragment>
            { Object.keys(post).length === 0 && post.constructor === Object ? (
               <Fragment>
                    <div>Welcome to the blog!</div>               
                </Fragment>
           ) : Object.keys(post).length > 0 ? (
               <Fragment>
                   <h3>{ post.title }</h3>
                    <p className={classes.postText}>{ post.body }</p>
                    <Divider />                    
                    <div className={classes.commentSection}>
                        <div className={classes.commentSectionInner}>
                            <div className={classes.commentHeader}>
                            <h3>Comments</h3>
                            <span className={ classes.showCount }>
                                Showing { count } {" "}
                                { count === 1 ? 'comment' : 
                                  count >= 2  ? 'comments' :
                                  count === 0 ? 'comments' :
                                ''}
                            </span>
                            </div>
                        </div>
                    {count === 0 ? (
                        <div className={classes.commentSection}>
                            <p>There are no comments. Be the first to comment on this post.</p>                                 
                        </div>
                    ) : ''}
                    { comments.filter((comment) => comment.post_id === post.id).map(comment => (
                        <Fragment key={comment.id}>
                            <div className={classes.comment} id={comment.id}>
                            <h4 className={classes.commentName}>{ comment.name }  
                                <span>
                                    <p className={classes.postDate}>Posted on <Moment format="MMMM DD, YYYY">{ comment.createdAt }</Moment></p>                                
                                </span>     
                            </h4>
                                <p className={ classes.commentTxt }>{ comment.comment }</p>
                            </div>                       
                        </Fragment>
                    ))}                        
                    </div>
                        <Button
                            variant="outlined" 
                            color="primary" 
                            disableElevation
                            className={classes.commentBtn}
                            onClick={props.handleClickOpenComment.bind(this, post)}>
                            Add a comment
                        </Button>
               </Fragment>
           ) : ''}
        </Fragment>
    );
}
export default Comment;