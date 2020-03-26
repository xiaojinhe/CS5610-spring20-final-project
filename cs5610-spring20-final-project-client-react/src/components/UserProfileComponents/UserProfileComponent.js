import React from 'react'
import UserProfileHeaderComponent from "./UserProfileHeaderComponent";

import NavComponent from "../NavComponent";
import UserProfileTabComponent from "./UserProfileTabComponent";

//todo: need to separate the condition, when user is viewing his own profile
class UserProfileComponent extends React.Component {
  componentDidMount() {
    this.props.findUserById(this.props.userId)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.userId !== prevProps.userId) {
      this.props.findUserById(this.props.userId)
    }
  }

  render() {
    return (
      <div>
        <NavComponent history={this.props.history}
                      enableSearch={true}/>
        <div className="container">
          {
            this.props.user &&
            <div>
              <UserProfileHeaderComponent user={this.props.user}
                                          isLoggedInUser={this.props.isLoggedInUser}/>
              <UserProfileTabComponent user={this.props.user}
                                       updateUser={this.props.updateUser}/>
            </div>
          }
        </div>
      </div>

    );
  }
}

export default UserProfileComponent
