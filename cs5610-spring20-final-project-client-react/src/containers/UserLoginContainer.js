import {connect} from "react-redux";
import UserService from "../services/UserSerivce";
import {loginUserAction} from "../actions/UserProfileAction";
import UserLoginComponent from "../components/UserLoginComponent";

const stateToPropertyMapper = (state) => ({});

const dispatchToPropertyMapper = (dispatch) => ({
  userLogin: (username, password) => {
    //todo: implement the actual user login
    const user = UserService.userLogin(username, password);
    dispatch(loginUserAction(user))
  }
});

const UserLoginContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(UserLoginComponent);

export default UserLoginContainer

