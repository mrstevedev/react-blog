import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DayJS from 'react-dayjs';

const useStyles = makeStyles((theme) => ({
    commentSection: {
        padding: '1rem 0',
        fontSize: '1.3rem',
        fontWeight: 500,
        color: 'rgb(136, 136, 136)'
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
        padding: '3rem 2rem',
        borderRadius: '6px',
        transition: '0.4s ease',
        '&:nth-child(odd)': {
            backgroundColor: '#fff'
        },
        '&:hover': {
            backgroundColor: '#f7f7f7',
        },
        '@media(max-width: 415px)': {
            padding: '2rem 0',
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
        padding: '0.5rem 0',
        fontSize: '1.3rem',
        fontWeight: '500',
        color: 'rgb(136, 136, 136)'
    },
    commentName: {
        display: 'flex',
        color: '#333',
        flexDirection: 'column',
        fontSize: '0.8rem',
        // justifyContent: 'space-between',
        '@media(max-width: 768px)': {
            display: 'initial',
          }
    },
    commentBtn: {
        margin: '1rem 0'
    },
    postDate: {
        fontWeight: 'bold',
        color: '#a7a7a7',
        fontSize: '14px'
    },
    showCount: {
        color: '#ccc'
    },
    postContent: {
        padding:  '2rem 2rem',
        '@media(min-width: 768px)': {
            padding:  '4rem 0rem'
          }
    },
    linkText: {
        color: "#3f51b5",
        textDecoration: "none",
      },
  }));

function Comment(props) {
    const classes = useStyles();
    const { post, comments } = props;
    const count = comments.filter(
        (comment) => comment.post_id === post.id).length;

    return(
        <Fragment>
            {  Object.keys(post).length > 0 ? (
               <Fragment>
                   <div>
                   <div className={`${classes.postContent}`}>
                    <Divider />                    
                    <div className={classes.commentSection}>
                        <div className={classes.commentSectionInner}>
                            <div className={classes.commentHeader}>
                            <h3 style={{ fontSize: '2.4rem', fontWeight: 'bold', color: '#000'}}>Comments <span className={ classes.showCount }>
                                | Showing { count } {" "}
                                { count === 1 ? 'comment' : 
                                  count >= 2  ? 'comments' :
                                  count === 0 ? 'comments' :
                                ''}
                            </span></h3>                                                    
                            </div>
                        </div>
                    {count === 0 ? (
                        <div className={classes.commentSection}>
                            <p className={classes.commentSectionTxt}>You must be signed in <Link className={`link ${classes.linkText}`} to="/signin">Sign In</Link></p>                                 
                        </div>
                    ) : ''}
                    { comments.filter((comment) => comment.post_id === post.id).map(comment => (
                        <Fragment key={comment._id}>
                            <div className={classes.comment}>
                            <h2 className={classes.commentName}>{ comment.name }  
                                <span>
                                    <p className={classes.postDate}>Posted on <DayJS date = { comment.createdAt } format="MMMM D, YYYY h:mm A" /></p>                                
                                </span>     
                            </h2>
                                <p className={ classes.commentTxt }>{ comment.comment }</p>
                            </div>                       
                        </Fragment>
                    ))}                 
                    </div>
                        <Button
                            variant="contained" 
                            color="primary" 
                            disableElevation
                            className={classes.commentBtn}
                            onClick={props.handleClickOpenComment.bind(this, post)}
                            >
                            Add a comment
                        </Button>
                        </div>
                        </div>
               </Fragment>
           ) : ''}
        </Fragment>
    );
}
export default Comment;