import {connect} from "react-redux";
import UserService from "../services/UserSerivce";
import {loginUserAction} from "../actions/UserProfileAction";
import UserLoginComponent from "../components/UserLoginComponent";

const stateToPropertyMapper = (state) => ({
  user: state.userAuthentication.currUser
});

const dispatchToPropertyMapper = (dispatch) => ({
  login: (user) => {
    return UserService.login(user);
  },
  updateUserState: (user) => {
    dispatch(loginUserAction(user));
  }
});

const UserLoginContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(UserLoginComponent);

export default UserLoginContainer

