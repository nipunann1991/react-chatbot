import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { fakeAuth } from "./fakeAuth";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)
