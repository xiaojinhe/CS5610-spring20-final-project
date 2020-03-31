import {connect} from "react-redux";
import {registerUser} from "../actions/UserProfileAction";
import RegisterComponent from "../components/register/RegisterComponent";
import UserSerivce from "../services/UserSerivce";

const store = require('store');

const stateToPropertyMapper = (state) => ({
  user: state.userAuthentication.currUser
});

const dispatchToPropertyMapper = (dispatch) => ({
  register: (username, password, verifyPassword, role, email, phone) => {
    const newUser = {
      username: username,
      password: password,
      role: role,
      email: email,
      phone: phone
    };
    UserSerivce.register(newUser)
      .then(response => {
        if (response.status && response.status > 200) {
          alert(response.error);
        } else {
          store.set('currUser', response);
          console.log(store.get('currUser'));
          dispatch(registerUser(response))
        }
      });
  }

});

const RegisterContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(RegisterComponent);

export default RegisterContainer
