import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import {PrivateRoute} from './privateRoute'

import Login from "./components/pages/login";
import Protected from "./components/pages/Protected";
import HomePage from "./components/pages/homePage";


function App() {
  return (

    <Router>
      <Route path="/login" component={Login}/>
      <PrivateRoute exact path='/protected' component={Protected} />
      <PrivateRoute exact path='/dashboard' component={HomePage} />
      <PrivateRoute exact path='/' component={HomePage} />
    </Router>

  );
}

export default App;
