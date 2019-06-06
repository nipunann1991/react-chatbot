import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import {fakeAuth} from '../../fakeAuth';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
    }

    this.getToken();

  }

  getToken = () =>{

    if(localStorage.getItem('login_status')){

      fakeAuth.authenticate(() => {
        this.setState(() => ({
          redirectToReferrer: true
        }))
      })
    }
  }


  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })

    localStorage.setItem('login_status', 'logged');
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      if(from.pathname == '/'){
        return <Redirect to='/dashboard' />
      }else{
        return <Redirect to={from} />
      }

    }

    return (

      <div className="container-fluid login-page page">
        <div className="container inner">

          <form action="#" className="login-form mini-form">
            <h2>Login</h2>
            <div className="form-group">
              <label for="email">Email address:</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label for="pwd">Password:</label>
              <input type="password" className="form-control" id="pwd" />
            </div>

            <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={this.login}>Log in</button>
            </div>
          </form>

        </div>
      </div>
    )
  }
}

export default Login;
