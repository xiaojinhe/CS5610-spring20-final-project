import {FIND_USER_BY_ID, USER_LOGIN} from "../common/constants";

const userProfileReducer = (state = {user: "", loggedInUser: ""}, action) => {
  switch (action.type) {
    case FIND_USER_BY_ID:
      return {
        ...state,
        user: action.user
      };
    case USER_LOGIN:
      return {
        ...state,
        loggedInUser: action.user
      };
    default:
      return state
  }
};

export default userProfileReducer