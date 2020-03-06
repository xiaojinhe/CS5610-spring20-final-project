import {connect} from "react-redux";
import {registerUser} from "../actions/UserProfileAction";
import RegisterComponent from "../components/register/RegisterComponent";

const stateToPropertyMapper = (state) => ({
  registerUser: state.userProfile.registerUser
});

const dispatchToPropertyMapper = (dispatch) => ({
  // TODO: change to call our api and verify the username is not exists
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
      dispatch(registerUser(username, password, role, email, phone));
      return true;
    }
  }
});

const RegisterContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(RegisterComponent);

export default RegisterContainer