import {FIND_USER_BY_ID, REGISTER, L, LOGIN, UPDATE_USER, GET_CURRENT_USER} from "../common/constants";

const userProfileReducer = (state = {user: "", registerUser: ""}, action) => {
  switch (action.type) {
    case FIND_USER_BY_ID:
      return {
        ...state,
        user: action.user,
        registerUser: state.registerUser
      };
    case LOGIN:
      return {
        ...state,
        loggedInUser: action.loggedInUser
      };
    case REGISTER:
      return {
        ...state,
        user: state.user,
        registerUser: action.registerUser
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user
      }
    case UPDATE_USER:
      return {
        ...state,
        user: action.updatedUser
      };
    default:
      return state
  }
};

export default userProfileReducer;
