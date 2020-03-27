import {connect} from "react-redux";
import UserService from "../services/UserSerivce";
import {loginUserAction} from "../actions/UserProfileAction";
import UserLoginComponent from "../components/UserLoginComponent";

const stateToPropertyMapper = (state) => ({});

const dispatchToPropertyMapper = (dispatch) => ({
  login: (user) => {
    //todo: may change reducer behavior
    UserService.login(user)
      .then(dispatch(loginUserAction(user)));
  }
});

const UserLoginContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(UserLoginComponent);

export default UserLoginContainer

