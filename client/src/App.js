import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import "./App.scss";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: '0.4rem',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    height: '92vh'
  },
  paperContent: {
    padding: theme.spacing(1),
    margin: '1rem 1rem 0 1rem',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    height: '91vh'
  },
  title: {
    flexGrow: 1,
  },
  dialogPaper: {
    padding: '3rem 0 0 0',
    width: '600px',
    height : '500px'
},
}));

function App() {
  const classes = useStyles();

  const [toast, setToastState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  
  const { vertical, horizontal, open } = toast;

  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [postBody, setPostBody] = useState('');
  const [openAddPost, setOpenAddPost] = useState(false);
  const [openAddComment, setOpenAddComment] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const commentCount = comments.filter((comment) => comment.post_id === post.id).length;

  const { REACT_APP_API_URL } = process.env;

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
        })
        .catch(err => console.log(err));
    }
  }

  const handleAddPost = (newState) => {

   if(postTitle.length === 0) {
       setError(true)
       setErrorMessage({ title: "Enter a title" });
   } 
   else if(postBody.length === 0) {
    setError(true);
    setErrorMessage({ body: 'Enter a post' })
   }
   else {
    fetch(`${ REACT_APP_API_URL }/addPost`, {
        method: 'POST',
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            postTitle,
            postBody
        })
    }).then(res => res.json())
        .then(data => {
            setOpenAddPost(false);
            // window.location.reload();
            setToastState({ open: true, ...newState });
        })
        .catch(err => console.log(err));
   }
  }

  const handleClickOpenComment = () => {
    setOpenAddComment(true);
  }
  
  const handleClickOpen = () => {
    setOpenAddPost(true);
  }

  const handleClose = () => {
    setOpenAddPost(false);
    setOpenAddComment(false);
  };

  const handleToastClose = () => {
    setToastState({  ...toast, open: false });
  }

  const handleGetPost = (event, post) => {
      event.preventDefault();

      const listItem = document.querySelectorAll(".MuiList-root a li");

      [].forEach.call(listItem, (el) => {
        el.classList.remove("current");
      });
      
      event.target.classList.add('current');
      
      setPost(post);
  }

  useEffect(() => {
    Promise.all([
        fetch(`${ REACT_APP_API_URL }/posts`, {
            method: "GET"
        }),
        fetch(`${ REACT_APP_API_URL }/comments`)
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([data1, data2]) => {
        setPosts(data1);
        setComments(data2);
    })
  }, []);

  return (
    <div>    
     <Header />
      <Grid container spacing={1}>
        <Sidebar 
            posts={posts}
            comments={comments}
            count={commentCount}
            handleClickOpen={handleClickOpen}
            handleGetPost={handleGetPost} />
        <Content 
            post={post}
            comments={comments}
            count={commentCount}
            handleClickOpenComment={handleClickOpenComment} />
      </Grid>
      {/* Add Blog Post Dialog */}
      <Dialog 
        classes={{ paper: classes.dialogPaper }}
        open={openAddPost} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField
            error={!!errorMessage.title}
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth={false}
            variant="outlined"
            onChange={e => setPostTitle(e.target.value)}
            helperText={
                errorMessage.title
            }
          />
          <TextField
            error={!!errorMessage.body}
            margin="dense"
            id="body"
            label="Body"
            type="text"
            fullWidth
            variant="outlined"
            onChange={e => setPostBody(e.target.value)}
            helperText={
                errorMessage.body
              }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPost.bind( this,  { vertical: 'top', horizontal: 'center' } )} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
     
    </div>
  );
}

export default App;
