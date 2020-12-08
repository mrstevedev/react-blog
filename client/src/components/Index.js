import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from '@material-ui/lab/Alert';
import LatestPost from "./LatestPost";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  '@media(min-width: 768px)': {
        container: {
            width: '1200px',
            margin: '0 auto'
        }
    }
  }));

export default function Index(props) {
    const classes = useStyles();

    const [toast, setToastState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [openAddPost, setOpenAddPost] = useState(false);
    const [openAddComment, setOpenAddComment] = useState(false);
      
    const { vertical, horizontal, open } = toast;
    
    const { posts, post, comments, commentCount } = props;

    const handleClickOpenComment = () => {
        setOpenAddComment(true);
    }

    const handleClickOpen = () => {
        setOpenAddPost(true);
    }

    const handleClose = () => {
        setOpenAddPost(false);
        setOpenAddComment(false);
    }

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
  

    return (
        <Fragment>
        {/* <div className={classes.container}> */}
        {/* <Grid container spacing={0}> */}
        {/* <Sidebar 
            posts={posts}
            comments={comments}
            count={commentCount}
            handleClickOpen={handleClickOpen}
            handleGetPost={handleGetPost} /> */}
        {/* <Content 
            posts={posts}
            post={post}
            comments={comments}
            count={commentCount}
            handleClickOpenComment={handleClickOpenComment} 
            handleGetPost={handleGetPost} /> */}
        <LatestPost 
            posts={posts}
            comments={comments}
            count={commentCount}
            handleClickOpenComment={props.handleClickOpenComment} 
            handleGetPost={props.handleGetPost} />
      {/* </Grid> */}
     {/* </div> */}
        </Fragment>
    )
}
