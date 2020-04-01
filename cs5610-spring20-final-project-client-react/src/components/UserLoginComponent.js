import React from 'react'
import NavComponent from "./NavComponent";
import {Link} from "react-router-dom";
const store = require('store');

class UserLoginComponent extends React.Component {
  state = {
    username: "",
    password: ""
  };

  onUsernameChange = (event) => {
    this.setState({
      username: event.target.value
    })
  };

  onPasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  };

  login = () => {
    this.props.login({
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      if (response) {
        this.props.updateUserState(response);
        store.set('currUser', response);
        this.props.history.push('/');
      } else {
        alert("Invalid username or password!");
      }
    });
  };

  render() {
    return (
      <div>
        <NavComponent/>
        <div className="container">
          <h1>Sign In</h1>

          <div>
            <div className="form-group row">
              <label htmlFor="username"
                     className="col-sm-2 col-form-label">
                Username
              </label>
              <div className="col-sm-10">
                <input
                  id="username"
                  type="text"
                  onChange={this.onUsernameChange}
                  value={this.state.username}
                  className="form-control"
                  placeholder="webdev"
                  autoComplete="on"/>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="password"
                   className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                onChange={this.onPasswordChange}
                value={this.state.password}
                type="password"
                className="form-control"
                id="password"
                placeholder="123%$@#*"
                autoComplete="on"/>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label"/>
            <div className="col-sm-10">
              <button
                id="signIn_btn"
                className="btn btn-primary btn-block"
                onClick={this.login}>
                Sign in
              </button>
              <Link
                id="cancel_btn"
                to="/"
                className="btn btn-secondary btn-block">
                Cancel
              </Link>
              <div className="row">
                <div className="col-6">
                </div>
                <div className="col-6">
                  <Link to="/register"
                        className="float-right">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}


export default UserLoginComponent;
