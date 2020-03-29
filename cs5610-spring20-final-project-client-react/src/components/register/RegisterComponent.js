import React from 'react';
import {Link} from 'react-router-dom';
import './register.style.client.css';
import {CRITIC_USER, REGULAR_USER} from "../../common/constants";
const store = require('store');

class RegisterComponent extends React.Component {

  state = {
    username: '',
    password: '',
    verifyPassword: '',
    role: 'REGULAR',
    email: '',
    phone: '',
    registerWithEmail: true
  };

  toggleRegisterWithEmail = () => {
    this.setState({registerWithEmail: !this.state.registerWithEmail});
  };

  render() {
    return(
      <div className="container-fluid">
        <div className="signup-form m-lg-5">
          <h2 className=" text-primary text-center">Create your account</h2>
          <div className="form-group row">
            <label htmlFor="username"
                   className="col-sm-2 col-form-label ">
              Username
            </label>
            <div className="col-sm-10">
              <input className="form-control"
                     id="username"
                     type="text"
                     placeholder="Alice"
                     onChange={(event) => {
                       this.setState({username: event.target.value})
                     }}
                     value={this.state.username}/>
            </div>
          </div>
          {this.state.registerWithEmail &&
            <div>
              <div className="form-group row">
                <label htmlFor="email"
                       className="col-sm-2 col-form-label ">
                  Email
                </label>
                <div className="col-sm-10">
                  <input className="form-control"
                         type="email"
                         id="email"
                         placeholder="alice@gmail.com"
                         onChange={(event) => {
                           this.setState({email: event.target.value});
                         }}/>
                  <button className="btn border-0 text-primary pt-3 pb-0"
                          onClick={this.toggleRegisterWithEmail}>
                    Use phone instead
                  </button>
                </div>
              </div>
            </div>
          }
          {!this.state.registerWithEmail &&
           <div>
             <div className="form-group row">
               <label htmlFor="phone"
                      className="col-sm-2 col-form-label ">
                 Phone
               </label>
               <div className="col-sm-10">
                 <input className="form-control"
                        type="tel"
                        id="phone"
                        placeholder="(123) 456-7890"
                        onChange={(event) => {
                          this.setState({phone: event.target.value});
                        }}/>
                 <button className="btn border-0 text-primary pt-3 pb-0"
                         onClick={this.toggleRegisterWithEmail}>
                   Use email instead
                 </button>
               </div>
             </div>
           </div>
          }
          <div className="form-group row">
            <label htmlFor="password"
                   className="col-sm-2 col-form-label ">
              Password
            </label>
            <div className="col-sm-10">
              <input type="password"
                     className="form-control"
                     id="password"
                     placeholder="123qwe#$%"
                     onChange={(event) => {
                       this.setState({password: event.target.value});
                     }}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="passwordVerify"
                   className="col-sm-2 col-form-label ">
              Verify Password
            </label>
            <div className="col-sm-10">
              <input type="password"
                     className="form-control"
                     id="passwordVerify"
                     placeholder="123qwe#$%"
                     onChange={(event) => {
                       this.setState({verifyPassword: event.target.value});
                     }}/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="role"
                   className="col-sm-2 col-form-label ">
              Role
            </label>
            <div className="col-sm-10">
              <select className="form-control"
                      id="role"
                      value={this.state.role}
                      onChange={(event) => {
                        this.setState({role: event.target.value});
                      }}>
                <option value={REGULAR_USER}>
                  Regular User
                </option>
                <option value={CRITIC_USER}>
                  Critic
                </option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-2"/>
            <div className="col-sm-10">
              <button className="btn btn-primary btn-block"
                      onClick={() => {
                        if(this.props.register(this.state.username,
                                            this.state.password,
                                            this.state.verifyPassword,
                                            this.state.role,
                                            this.state.email,
                                            this.state.phone)) {
                          //TODO: need to think about the route later
                          this.props.history.push("/profile");
                        }
                      }}>
                Sign up
              </button>
              <button className="btn btn-secondary btn-block"
                      onClick={() => this.props.history.push("/")}>
                Cancel
              </button>
              <div className="row">
                <div className="col-12 float-left mt-2">
                  <p id="LoginHelpInline"
                         className="text-muted">
                    Have an account?
                    <Link to="/login"
                       className="pl-2">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;

