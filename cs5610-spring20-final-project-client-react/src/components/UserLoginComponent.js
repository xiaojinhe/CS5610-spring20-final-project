import React from 'react'
import NavComponent from "./NavComponent";
import {Link} from "react-router-dom";

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

  userLogin = () => {
    this.props.userLogin(this.state.username, this.state.password);
    //todo: change the /profile/:id to /profile after implemented the user login logic
    this.props.history.push("/profile/1")
  };

  render() {
    return (
      <div>
        <NavComponent/>
        <div className="container">
          <h1>Sign In</h1>

          <div>
            <div className="form-group row">
              <label htmlFor="email"
                     className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
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
                onClick={this.userLogin}>
                Sign in
              </button>
              <Link
                id="cancel_btn"
                to="/"
                className="btn btn-danger btn-block">
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
