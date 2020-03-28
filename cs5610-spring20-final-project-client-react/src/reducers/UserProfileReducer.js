import {FIND_USER_BY_ID} from "../common/constants";

const userProfileReducer = (state = {user: ""}, action) => {
  switch (action.type) {
    case FIND_USER_BY_ID:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state
  }
};

export default userProfileReducer;
