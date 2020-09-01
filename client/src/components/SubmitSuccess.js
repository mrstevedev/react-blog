import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';

import { Link } from "react-router-dom";

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
      height: '92vh'
    },
    paperContent: {
      padding: '3rem 8rem',
      margin: '1rem 1rem 0 1rem',
      textAlign: 'left',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      height: '91vh'
    },
    title: {
      flexGrow: 1,
    },
    postText: {
      padding: '0.4rem 0 1rem'
    }
  }));

function Success( props ) {
  const { post, submit } = props;
  const classes = useStyles();

  return (
    <Fragment>
      <Grid item xs={10}>
        <Paper square={true} className={classes.paperContent}>
            <h2>Success!</h2>
            <p className={classes.postText}>Your post was successfully submitted.</p>
            <Divider />
        </Paper>
      </Grid>
    </Fragment>
  );
}

export default Success;
