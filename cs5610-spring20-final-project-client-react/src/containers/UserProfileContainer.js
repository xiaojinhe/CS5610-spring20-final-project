import {connect} from "react-redux";
import UserProfileComponent from "../components/UserProfileComponents/UserProfileComponent";
import UserService from "../services/UserSerivce";
import {findUserByIdAction, updateUserAction} from "../actions/UserProfileAction";
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
          dispatch(updateUserAction(user));
        }
      })
  },
  followUser: (userId, user) => {
    //TODO: call with current userId and target user,change UI based on server result
    UserService.followUser(userId, user);
  },
  unfollowUser: (userId, criticId) => {
    //TODO: call this and change UI based on server result
    UserService.unfollowUser(userId, criticId);
  },
  getCurrentUser: () => {
    const user = store.get('currUser') ? store.get('currUser') : UserService.getCurrentUser();
    dispatch(findUserByIdAction(user));
  }
});

const UserProfileContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(UserProfileComponent);

export default UserProfileContainer

