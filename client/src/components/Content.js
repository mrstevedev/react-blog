import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Comment from './Comment';

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
      height: '98%',
      '@media(max-width: 768px)': {
        padding: '3rem 2rem !important',      
        whiteSpace: 'normal !important'
      }
    },
    title: {
      flexGrow: 1,
    },
    successMsg: {
        fontWeight: 'bold',
        color: 'cadetblue',
        padding: '2rem 0'
    }
  }));

function Content( props ) {
  const { post, comments } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <Grid item xs={10}>
        <Paper square={true} className={classes.paperContent}>
           <Comment post={post} comments={comments} handleClickOpenComment={props.handleClickOpenComment} />
        </Paper>
      </Grid>
    </Fragment>
  );
}

export default Content;
