import React, { useState, Fragment, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Comment from './Comment';
import skyline from '../../public/skyline.jpg'

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiAlert from "@material-ui/lab/Alert";
import DayJS from 'react-dayjs';
import axios from "axios";

import useSWR from "swr";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
        whiteSpace: 'normal !important',
      }
    },
    postContent: {
        padding:  '2rem 2rem',
        '@media(min-width: 768px)': {
            padding:  '6rem 8rem',
            width: '1200px'
          }
    },
    relatedPosts: {
        display: 'flex',
        overflow: 'scroll'
    },
    chip: {
        margin: '0 0.5rem 0 0',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: '#797979',
        '&:hover': {
            background: '#3f51b5',
            color: '#fff'
        }
    },
    adminText: {
        color: '#ccc'
    },
    dialogPaper: {
        padding: '3rem 0 0 0',
        width: '600px',
        height : '500px'
    },
  }));

function Post(props) {
    const classes = useStyles();

    const [toast, setToastState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    // const { posts, post, comments } = props;
    // console.log(props.location.state)
    const post = props.location.state.post;
    const posts = props.location.state.posts;
    const comments = props.location.state.comments;
    // console.log(props.location.state);
    const newTags = props.location.state.post.tags.split(', ');
    // console.log(newTags);
    
    // const count = comments.filter(
    //     (comment) => comment.post_id === post.id).length;
    const [commentName, setCommentName] = useState('');
    const [commentBody, setCommentBody] = useState('');
    const [openAddPost, setOpenAddPost] = useState(false);
    const [openAddComment, setOpenAddComment] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});

    const { vertical, horizontal, open } = toast;

    const { REACT_APP_API_URL } = process.env;

    const { data, mutate, isValidating } = useSWR(`${ REACT_APP_API_URL }/posts`)

    const handleAddComment = (post, newState) => {
        // console.log(post);
          if(commentName.length === 0) {
              setError(true);
              setErrorMessage({ name: 'Enter a name' })
          }
          else if(commentBody.length === 0) {
            setError(true);
            setErrorMessage({ comment: 'Enter a comment' })
        } else {
            fetch(`${ REACT_APP_API_URL }/addComment`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    post_id: post.id,
                    commentName,
                    commentBody
                })
            })
            .then(res => res.json())
            .then(data => {
                setOpenAddComment(false);
                setToastState({ open: true, ...newState });
                mutate(`${ REACT_APP_API_URL }/comments`);
            })
            .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleClose = () => {
        setOpenAddPost(false);
        setOpenAddComment(false);
    }

    const handleToastClose = () => {
        setToastState({  ...toast, open: false });
    }

    const handleClickOpenComment = () => {
        setOpenAddComment(true);
    }

    const handleHeart = (e, id) => {
        
        e.currentTarget.classList.toggle('pop');
        e.currentTarget.childNodes[0].childNodes[1].classList.toggle('fill');
        e.currentTarget.parentNode.classList.toggle('post-liked');
          
        if(e.currentTarget.parentNode.classList.contains('post-liked')) {
          axios.patch(`${ REACT_APP_API_URL }/posts/${id}`, {
            data: { id: id }
          }).then(res => {
              res.data
              mutate(`${ REACT_APP_API_URL }/posts`)
          } )
          .catch(err => {
            throw err
          })
        } else {
          axios.patch(`${ REACT_APP_API_URL }/posts/${id}`, {
              data: { id: id, decrement: true }
          }).then(res => {
              res.data
              mutate(`${ REACT_APP_API_URL }/posts`)
          } )
          .catch(err => {
              throw err
          })
        }
      }

    return(
        <Fragment>
          <div className={`container ${classes.postContent}`}>
                <h3 style={{ fontSize: '2.4rem', fontWeight: 'bold', color: '#000'}}>{ post.title } 
                    <span className={classes.adminText}> | Posted by { post.name }</span></h3>    
                <div style={{ background: `url(${ skyline })` , backgroundPosition: '0 -330px', width: '100%', height: '250px', borderRadius: '6px', margin: '1rem 0'}}></div>                    
                    <div key={post.id}>
                        <p style={{
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', fontSize: '1.3rem', fontWeight: '500', color: '#888', lineHeight: '43px' }}
                            >{ post.body }</p>
                        <div style={{  display: 'flex', alignItems: 'center', margin: '0.5rem 0 0 0', justifyContent: 'space-between' }}>
                            <div>
                           { newTags.map((tag, index, tags) => (
                                <Link key={index} to={{
                                    pathname: '/posts',
                                    state: {
                                        posts: posts,
                                        post: post,
                                        tag: tag,
                                        comments: comments
                                    }
                                }} style={{ textDecoration: 'none' }}>
                                    <Chip size="small" label={ tag.toLowerCase()  } className={classes.chip} />
                                </Link>
                           )) }
                            <span className="" style={{ color: '#333', fontSize: "12px", fontWeight: 'bold' }}>Posted by 
                                <Link to={{
                                    pathname: '/profile',
                                    state: {
                                        post: post
                                    }
                                }} style={{ textDecoration: 'none', color: '#3f51b5' }}> { post.name } </Link> 
                                on <DayJS date = { post.createdAt } format="MMMM D, YYYY h:mm A" />
                            </span>
                            </div>
                            <div className="post-list" style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                            
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '0 0.5rem' }}>
                                <span style={{  margin: '0 0.5rem 0 0' }}>{ comments.filter(comment => comment.post_id === post.id).length }</span>                  
                                <svg width="19" height="19" viewBox="0 0 24 22"xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                <path fill="#66a6d9" d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007m0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007"/>
                                </svg>   
                            </div>
                             {/* Heart Functionality */}
                             <div className="post-likes" style={{ display: 'flex', alignItems: 'center', margin: '0 0.5rem', position: 'relative' }}>
                                <span style={{  margin: '0 1.5rem 0 0' }}>{ post.likes }</span>                  
                                {/* Toggle SVG */} 
                                <span id="heart">                            
                                <svg onClick={(e) => handleHeart(e, post.id)} className="heart" fill="none" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 16 15">
                                <g id="heart" strokeMiterlimit="10">
                                    <path d="M8,15,6.84,13.937C2.72,10.1,0,7.6,0,4.5A4.386,4.386,0,0,1,4.4,0,4.7,4.7,0,0,1,8,1.717,4.7,4.7,0,0,1,11.6,0,4.386,4.386,0,0,1,16,4.5c0,3.106-2.72,5.6-6.84,9.441Z" stroke="none"/>
                                    <path d="M 8 13.64373970031738 L 8.48186206817627 13.20225715637207 L 8.644049644470215 13.05103969573975 C 12.47146034240723 9.482660293579102 15 7.125249862670898 15 4.49590015411377 C 15 3.53331995010376 14.65030956268311 2.645900011062622 14.01533985137939 1.997089982032776 C 13.38607025146484 1.3541100025177 12.52828979492188 1 11.60000038146973 1 C 10.53046035766602 1 9.472579956054688 1.506360054016113 8.770179748535156 2.354510068893433 L 8.000020027160645 3.284480094909668 L 7.22983980178833 2.354520082473755 C 6.527400016784668 1.506360054016113 5.469510078430176 1 4.400000095367432 1 C 3.471709966659546 1 2.613929986953735 1.3541100025177 1.984660029411316 1.997089982032776 C 1.349689960479736 2.645900011062622 1 3.53331995010376 1 4.49590015411377 C 1 7.125249862670898 3.528589963912964 9.482709884643555 7.356080055236816 13.05115985870361 L 7.518139362335205 13.2022590637207 L 8 13.64373970031738 M 8 15 L 6.839849948883057 13.9370698928833 C 2.719919919967651 10.09539031982422 0 7.601950168609619 0 4.49590015411377 C 0 1.9617600440979 1.919919967651367 -8.881784197001252e-16 4.400000095367432 -8.881784197001252e-16 C 5.799960136413574 -8.881784197001252e-16 7.119880199432373 0.653980016708374 8 1.71668004989624 C 8.880080223083496 0.653980016708374 10.19995975494385 -8.881784197001252e-16 11.60000038146973 -8.881784197001252e-16 C 14.08008003234863 -8.881784197001252e-16 16 1.9617600440979 16 4.49590015411377 C 16 7.601990222930908 13.28003978729248 10.09543037414551 9.160149574279785 13.9370698928833 L 8 15 Z" stroke="none" fill="#66a6d9"/>
                                </g>
                                </svg>                    
                                </span>
                                {/* End Toggle SVG */}
                                </div>
                                </div>
                        </div>
                        <Comment 
                            handleClickOpenComment={handleClickOpenComment.bind(this, post)} 
                            comments={comments} 
                            post={post} 
                            posts={posts} />                            
                </div>                        
            </div>

             {/* Add Comment Dialog */}
      <Dialog 
        classes={{ paper: classes.dialogPaper }}
        open={openAddComment}
        onClose={handleClose} 
        aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField
            error={!!errorMessage.name}
            autoFocus
            margin="dense"
            id="name"
            label="Your name"
            type="text"
            fullWidth={false}
            variant="outlined"
            onChange={e => setCommentName(e.target.value)}
            helperText={
                errorMessage.name
            }
          />
          <TextField
            error={!!errorMessage.comment}
            margin="dense"
            id="comment"
            label="Your Comment"
            type="text"
            fullWidth
            variant="outlined"
            multiline={true}
            onChange={e => setCommentBody(e.target.value)}
            helperText={
                errorMessage.comment
              }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddComment.bind(this, post, { vertical: 'top', horizontal: 'center' } )} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000} 
        onClose={handleToastClose}
        key={vertical + horizontal}>
        <Alert onClose={handleToastClose} severity="success">
            Success! Post submitted
        </Alert>
     </Snackbar>

        </Fragment>
    );
}
export default Post;