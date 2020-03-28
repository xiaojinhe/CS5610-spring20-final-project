import {REGISTER, LOGIN, UPDATE_USER, GET_CURRENT_USER} from "../common/constants";

const userAuthenticationReducer = (state = {currUser: ""}, action) => {
  switch (action.type) {
    case LOGIN:
      console.log(action.loggedInUser);
      return {
        ...state,
        currUser: action.loggedInUser
      };
    case REGISTER:
      return {
        ...state,
        currUser: action.registerUser
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        currUser: action.user
      };
    case UPDATE_USER:
      return {
        ...state,
        currUser: action.updatedUser
      };
    default:
      return state
  }
};

export default userAuthenticationReducer;
