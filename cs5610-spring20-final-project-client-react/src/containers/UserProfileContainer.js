import {connect} from "react-redux";
import UserProfileComponent from "../components/UserProfileComponents/UserProfileComponent";
import UserService from "../services/UserService";
import {findUserByIdAction, followUserAction, unfollowUserAction, updateUserAction} from "../actions/UserProfileAction";

const store = require('store');

const stateToPropertyMapper = (state) => ({
  user: state.userProfile.user
});

const dispatchToPropertyMapper = (dispatch) => ({
  findUserById: (userId) => {
    UserService.findUserById(userId)
      .then(user => dispatch(findUserByIdAction(user)));
  },
  updateUser: (userId, user) => {
    UserService.updateUser(userId, user)
      .then(response => {
        if (response.status === 200) {
          alert("Successully update your profile!");
          store.set('currUser', user);
          dispatch(updateUserAction(user));
        }
      })
  },
  followUser: (userId, userToFollow) => {
    UserService.followUser(userId, userToFollow)
      .then(response => {
        if (response.status === 200) {
          const currUser = store.get('currUser');
          currUser.follows.push(userToFollow);
          dispatch(followUserAction({userId: userId, username: currUser.username, avatarURL: currUser.avatarURL}));
        }
      })
  },
  unfollowUser: (userId, criticId) => {
    UserService.unfollowUser(userId, criticId)
      .then(response => {
        if (response.status === 200) {
          const currUser = store.get('currUser');
          currUser.follows = currUser.follows.filter(f => f.userId !== criticId);
          dispatch(unfollowUserAction(userId));
        }
      })
  },
  getCurrentUser: () => {
    UserService.getCurrentUser().then(user => {
      store.set('currUser', user);
      dispatch(findUserByIdAction(user));
    });
  }
});

const UserProfileContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(UserProfileComponent);

export default UserProfileContainer

