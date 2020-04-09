import {
  DELETE_COMMENT,
  DELETE_REVIEW,
  FIND_USER_BY_ID,
  FOLLOW_USER,
  UNFOLLOW_USER,
  UPDATE_USER
} from "../common/constants";

const userProfileReducer = (state = {user: ""}, action) => {
  switch (action.type) {
    case FIND_USER_BY_ID:
      return {
        ...state,
        user: action.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.updatedUser,
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
    case DELETE_REVIEW:
      return {
        ...state,
        user: {
          ...state.user,
          ratingAndCommentsOrReviews:
              state.user.ratingAndCommentsOrReviews.filter(r => r._id !== action.reviewId),
          likedReviews:
              state.user.likedReviews.filter(r => r._id !== action.reviewId)
        }
      };
    case DELETE_COMMENT:
      return {
        ...state,
        user: {
          ...state.user,
          ratingAndCommentsOrReviews:
              state.user.ratingAndCommentsOrReviews.filter(c => c._id !== action.commentId)
        }
      };
    default:
      return state
  }
};

export default userProfileReducer;
