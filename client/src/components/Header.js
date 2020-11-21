import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000'
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();
  return (
      <AppBar color="inherit" position="static" elevation="0">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <a href="/" style={{ color: '#333', textDecoration: 'none' }}>React.js Blog</a>
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

export default Header;
