import {
  DELETE_COMMENT,
  DELETE_REVIEW,
  FIND_USER_BY_ID,
  FOLLOW_USER,
  GET_CURRENT_USER,
  LOGIN,
  REGISTER,
  UNFOLLOW_USER,
  UPDATE_USER,
} from "../common/constants";

export const findUserByIdAction = (user) => ({
  type: FIND_USER_BY_ID,
  user: user
});

export const getCurrentUserAction = (user) => ({
  type: GET_CURRENT_USER,
  user: user
});

export const loginUserAction = (user) => ({
  type: LOGIN,
  loggedInUser: user
});

export const registerUser = (user) => ({
  type: REGISTER,
  registerUser: user
});

export const updateUserAction = (user) => ({
  type: UPDATE_USER,
  updatedUser: user
});

export const followUserAction = (currUser) => ({
  type: FOLLOW_USER,
  currUser: currUser
});

export const unfollowUserAction = (currUserId) => ({
  type: UNFOLLOW_USER,
  currUserId: currUserId
});

export const deleteReviewAction = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId: reviewId
});

export const deleteCommentAction = (commentId) => ({
  type: DELETE_COMMENT,
  commentId: commentId
});
