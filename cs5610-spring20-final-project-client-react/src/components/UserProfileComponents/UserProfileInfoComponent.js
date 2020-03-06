import React from 'react'

class UserProfileInfoComponent extends React.Component {
  state = {
    user: this.props.user
  };

  onPhoneChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        phone: event.target.value
      }
    })
  };

  onPasswordChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        password: event.target.value
      }
    })
  };

  onEmailChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        email: event.target.value
      }
    })
  };

  render() {
    return (
      <div className="m-3">
        {/*//todo: show this when user save profile success*/}
        <div className="alert alert-success d-none" role="alert">
          Profile successfully saved!
        </div>
        <div className="form-group row">
          <label htmlFor="username"
                 className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input readOnly
                   className="form-control"
                   id="username"
                   value={this.state.user.username}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="password"
                 className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input type="password"
                   className="form-control"
                   id="password"
                   placeholder="123qwe#$%"
                   value={this.state.user.password}
                   onChange={this.onPasswordChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="phone"
                 className="col-sm-2 col-form-label">
            Phone
          </label>
          <div className="col-sm-10">
            <input type="tel"
                   className="form-control"
                   id="phone"
                   placeholder="(123) 456-7890"
                   value={this.state.user.phone}
                   onChange={this.onPhoneChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="email"
                 className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input type="email"
                   className="form-control"
                   id="email"
                   placeholder="harry@hogwarts.edu"
                   value={this.state.user.email}
                   onChange={this.onEmailChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="role"
                 className="col-sm-2 col-form-label">
            Role
          </label>
          <div className="col-sm-10">
            <input readOnly
                   className="form-control"
                   id="role"
                   value={this.state.user.role}/>
          </div>
        </div>

        <div className="form-group row">
          <button className="btn btn-info btn-block"
                  onClick={() => {
                    this.props.updateUser(this.state.user.uid, this.state.user)
                  }}>
            Update
          </button>
          <button className="btn btn-danger btn-block">
            Logout
          </button>
        </div>
      </div>
    )
  }
}

export default UserProfileInfoComponent