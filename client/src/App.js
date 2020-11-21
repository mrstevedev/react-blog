import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from './components/Header';
import Index from "./components/Index";

import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import useSWR, { trigger } from 'swr';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";

function App() {
  return (
    <Fragment>
      <Router>
      {/* <Header /> */}
        <Route exact path="/" component={Index} />
     </Router>      
     
    </Fragment>
  );
}

export default App;
