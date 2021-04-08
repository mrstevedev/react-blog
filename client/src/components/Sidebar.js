import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import MaterialLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

import CommentCount from './CommentCount';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    height: "100vh",
    position: 'fixed',
    zIndex: '1',
    backgroundColor: '#101010',
    '@media(min-width: 768px)': {
      width: '250px'
    },
    '@media(max-width: 662px)': {
      width: '50px'
    }
  },
  paperInner: {
    textAlign: "center",
    backgroundColor: '#101010',
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    height: "88vh",
    position: 'relative',
    overflow: 'scroll'
  },
  menuItem: {
      padding: '1rem 0.5rem',
      borderLeft: 'solid 6px transparent',
      borderBottom: 'solid 1px #2b2b2b',
      fontSize: '0.9rem',
      whiteSpace: 'break-spaces',
      // fontWeight: 'bold',
      '&.current': {
        borderLeft: 'solid 6px #3c5aff'
      },
      '@media(max-width: 768px)': {
        textIndent: '-9999px'
    }

  },
  sideBarBtm: {
    position: 'absolute !important',
    bottom: '0',
    width: '100%',
    right: '0',
    textAlign: 'right',
    overflow: 'hidden',
    backgroundColor: '#101010',
    '@media(max-width: 768px)': {
        whiteSpace: 'initial'
    }
  },
  navStyles: {
    color: '#fff',
    textDecoration: 'none'
  },
  sideBarLogoContainer: {
    "@media(max-width: 545px)": {
      display: 'none'
    }
  },
  sideBarLogo: {
    borderRadius: '4px', 
    padding: '0.2rem 0.4rem', 
    background: '#252525',
    color: '#525252',
    fontWeight: 'bold',
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    "@media(max-width: 545px)": {
      display: 'none'
    }
  },
  sidebarBtn: {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }
}));

function Sidebar( props ) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { posts, comments } = props;
  return (
    <Fragment>
      <Grid item xs={2} className={classes.margin}>
        <Paper elevation={0} square={true} className={classes.paper}>
        <Paper elevation={0} square={true} className={classes.paperInner}>

        <MenuList>
        <MenuItem  className={classes.sideBarLogoContainer}>
          <Link onClick={props.handleRemoveCurrent} to="/" className={classes.sideBarLogo}>
            React.js Blog
            </Link>
        </MenuItem>
            { posts.slice(0).reverse().map((post) => (
                <Link key={post.id} to={{
                  pathname: `/post/${post.title.split(' ').join('-').toLowerCase()}`, // Create utility function
                  state: {
                    post: post,
                    posts: posts,
                    comments: comments
                  }
                }}  onClick={(e) => props.handleGetPost(event, post)} underline="none" color="inherit" className={classes.navStyles}>
                    <MenuItem className={classes.menuItem}>
                        { post.title }
                        <CommentCount post={post} comments={comments} />
                    </MenuItem>
                </Link>
            )) }
        </MenuList>
        </Paper>
          <div className={classes.sideBarBtm}>
            <Divider />
            <Button onClick={props.handleClickOpen} className={ classes.sidebarBtn }>Add New Post</Button>
          </div>
        </Paper>
      </Grid>
    </Fragment>
  );
}
export default Sidebar;