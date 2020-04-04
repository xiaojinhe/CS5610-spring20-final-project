import React from 'react'
import UserProfileHeaderComponent from "./UserProfileHeaderComponent";

import UserProfileTabComponent from "./UserProfileTabComponent";
import NavContainer from "../../containers/NavContainer";

const store = require('store');

//todo: need to separate the condition, when user is viewing his own profile
class UserProfileComponent extends React.Component {
  componentDidMount() {
    if (this.props.userId) {  // with userId in url
      this.props.findUserById(this.props.userId);
    } else if (this.hasLoggedIn()) {  // without userId in url, user has logged in
      this.props.getCurrentUser();
    } else { // without userId in url, user has not logged in
      this.askForLogin();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.userId !== prevProps.userId) {
      if (this.props.userId) {
        if (this.props.userId !== prevProps.user._id) {
          this.props.findUserById(this.props.userId);
        }
      } else if (this.hasLoggedIn()) {  // without userId in url, user has logged in
        this.props.getCurrentUser();
      } else { // without userId in url, user has not logged in
        this.askForLogin();
      }
    }
  }

  hasLoggedIn = () => store.get('currUser') != null

  askForLogin = () => {
    alert("Please log in first");
    this.props.history.push("/login");
  }

  isCurrentUserProfile = () => {
    const currentUser = store.get('currUser');
    // console.log("current user", currentUser)
    if (!currentUser) {
      return false;
    }
    return currentUser._id === this.props.user._id;
  };

  isFollowedBy = () => {
    const currentUser = store.get('currUser');
    if (!currentUser) {
      return false;
    }
    return this.props.user.followedBy &&
      this.props.user.followedBy.find(fan => fan.userId === currentUser._id) != null
  };

  followUser = () => {
    const currentUser = store.get('currUser');
    if (!currentUser) {
      this.askForLogin();
    } else {
      const userToFollow = {
        userId: this.props.userId,
        username: this.props.user.username,
        avatarURL: this.props.user.avatarURL
      };
      this.props.followUser(currentUser._id, userToFollow)
    }
  };

  unfollowUser = () => {
    const currentUser = store.get('currUser');
    if (!currentUser) {
      this.askForLogin();
    } else {
      this.props.unfollowUser(currentUser._id, this.props.userId)
    }
  };

  render() {
    return (
      <div>
        <NavContainer history={this.props.history}
                      enableSearch={true}/>
        <div className="container">
          {
            this.props.user &&
            <div>
              <UserProfileHeaderComponent user={this.props.user}
                                          isCurrentUserProfile={this.isCurrentUserProfile()}
                                          isFollowedBy={this.isFollowedBy()}
                                          followUser={this.followUser}
                                          unfollowUser={this.unfollowUser}/>
              <UserProfileTabComponent user={this.props.user}
                                       updateUser={this.props.updateUser}
                                       deleteReview={this.props.deleteReview}
                                       deleteComment={this.props.deleteComment}/>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default UserProfileComponent;
