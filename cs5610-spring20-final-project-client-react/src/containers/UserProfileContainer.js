import {connect} from "react-redux";
import UserProfileComponent from "../components/UserProfileComponents/UserProfileComponent";
import UserService from "../services/UserSerivce";
import {findUserByIdAction, updateUserAction} from "../actions/UserProfileAction";

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
      .dispatch(updateUserAction(user));
  },
  followUser: (userId, user) => {
    //TODO: call service and implement reducer
  },
  getCurrentUser:() => {
    UserService.getCurrentUser()
      .then(user => dispatch(findUserByIdAction(user)))
  }
});

const UserProfileContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(UserProfileComponent);

export default UserProfileContainer

