import {FIND_USER_BY_ID, FOLLOW_USER, UNFOLLOW_USER} from "../common/constants";

const userProfileReducer = (state = {user: ""}, action) => {
  switch (action.type) {
    case FIND_USER_BY_ID:
      return {
        ...state,
        user: action.user,
      };
    case FOLLOW_USER:
      return {
        ...state,
        user: {
          ...state.user,
          followedBy: [
            ...state.user.followedBy,
            action.currUser
          ]
        }
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        user: {
          ...state.user,
          followedBy:
            state.user.followedBy.filter(f => f.userId !== action.currUserId)
        }
      };
    default:
      return state
  }
};

export default userProfileReducer;
