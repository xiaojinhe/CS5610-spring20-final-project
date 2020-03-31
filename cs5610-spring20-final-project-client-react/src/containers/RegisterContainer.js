import {connect} from "react-redux";
import {registerUser} from "../actions/UserProfileAction";
import RegisterComponent from "../components/register/RegisterComponent";
import UserService from "../services/UserService";
const store = require('store');

const stateToPropertyMapper = (state) => ({
  user: state.userAuthentication.currUser
});

const dispatchToPropertyMapper = (dispatch) => ({
  register: (username, password, verifyPassword, role, email, phone) => {
    if (password !== verifyPassword) {
      alert("Password does not match!");
      return false;
    } else if (!username || !password) {
      alert("username and password must be provided!");
      return false;
    } else if (!email && !phone) {
      alert("Email or phone must be provided!");
      return false;
    } else {
      const newUser = {
        username: username,
        password: password,
        role: role,
        email: email,
        phone: phone
      };
      //TODO: handle when username is duplicate
      //TODO: should not add user to redux state, but call server for current user
      UserService.register(newUser)
        .then(user => {
          store.set('currUser', user);
          console.log(store.get('currUser'));
          return dispatch(registerUser(user));
        });
      return true;
    }
  }
});

const RegisterContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(RegisterComponent);

export default RegisterContainer
