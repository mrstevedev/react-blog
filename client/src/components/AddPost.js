import React, { useState, Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiAlert from "@material-ui/lab/Alert";

import { mutate } from "swr";

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
    title: {
      flexGrow: 1,
    },
    postText: {
      padding: '0.4rem 0 1rem'
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
    },
    postContent: {
        padding:  '2rem 2rem',
        '@media(min-width: 768px)': {
            padding:  '4rem 8rem',
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
    textField: {
        display: 'block',
        margin: '1.4rem'
    },
    profileLabel: {
        color: '#a5a5a5',
        margin: '1rem 0',
        fontSize: '0.76rem',
        textTransform: 'uppercase'
    },
    profileRow: {
        margin: '2rem 0'
    }
  }));

function Profile(props) {
    const classes = useStyles();

    const [toast, setToastState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    return(
        <Fragment>
          <div className="container">
                <h3 style={{ fontSize: '2.4rem', fontWeight: 'bold', color: '#000'}}>Add Post<span className={classes.adminText}></span></h3>                        
                    <div>
                        <p style={{
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', fontSize: '1.3rem', fontWeight: '500', color: '#888', lineHeight: '43px' }}
                            ></p>
                        <div style={{ padding: '2rem 0', borderRadius: '4px', margin: '0rem 0' }}>
                            <div className={ classes.profileRow }>
                            <h2 className={ classes.profileLabel }>Name:</h2>
                            <h3> Jay Gordon</h3>
                            </div>
                         
                            <Button variant="contained" color="primary">
                                Submit
                            </Button>                            
                        </div>
                </div>                        
            </div>    
        </Fragment>
    );
}
export default Profile;