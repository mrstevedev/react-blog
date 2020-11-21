import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import CommentCount from './CommentCount';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    marginTop: "0.4rem",
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    height: "92vh",
    position: 'relative'
  },
  paperInner: {
    marginTop: "0.4rem",
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    height: "88vh",
    position: 'relative',
    overflow: 'scroll'
  },
  menuItem: {
      padding: '1rem',
      borderLeft: 'solid 10px transparent',
      '&.current': {
        borderLeft: 'solid 10px #0095ff'
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
    background: '#fff',
    '@media(max-width: 768px)': {
        whiteSpace: 'initial'
    }
  }
}));

function Sidebar( props ) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { posts, comments } = props;
  return (
    <Fragment>
      <Grid item xs={2} className={classes.margin}>
        <Paper square={true} className={classes.paper}>
        <Paper elevation={0} square={true} className={classes.paperInner}>

        <MenuList>
        <MenuItem>
          <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'none' }}>React.js Blog</Link>
        </MenuItem>
            { posts.map((post) => (
                <Link key={post._id} href="#" onClick={(e) => props.handleGetPost(event, post)} underline="none" color="inherit">
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
            <Button color="primary" onClick={props.handleClickOpen}>New Blog</Button>
          </div>
        </Paper>
      </Grid>
    </Fragment>
  );
}
export default Sidebar;