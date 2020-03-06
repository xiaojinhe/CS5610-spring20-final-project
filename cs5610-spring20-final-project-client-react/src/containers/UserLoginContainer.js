import {connect} from "react-redux";
import UserService from "../services/UserSerivce";
import {userLoginAction} from "../actions/UserProfileAction";
import UserLoginComponent from "../components/UserLoginComponent";

const stateToPropertyMapper = (state) => ({});

const dispatchToPropertyMapper = (dispatch) => ({
  userLogin: (email, password) => {
    //todo: implement the actual user login
    const user = UserService.userLogin(email, password);
    dispatch(userLoginAction(user))
  }
});

const UserLoginContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(UserLoginComponent);

export default UserLoginContainer

