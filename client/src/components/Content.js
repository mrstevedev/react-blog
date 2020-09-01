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
        borderRadius: '3px',
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
