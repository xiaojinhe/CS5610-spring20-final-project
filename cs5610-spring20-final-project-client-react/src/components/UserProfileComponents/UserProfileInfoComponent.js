import React from 'react'

class UserProfileInfoComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="alert alert-success" role="alert">
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
                   value={this.props.user.username}
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
                   value={this.props.user.password}/>
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
                   value={this.props.user.phone}/>
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
                   value={this.props.user.email}/>
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
                   value={this.props.user.role}/>
          </div>
        </div>

        <div className="form-group row">
          <button className="btn btn-info btn-block">
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