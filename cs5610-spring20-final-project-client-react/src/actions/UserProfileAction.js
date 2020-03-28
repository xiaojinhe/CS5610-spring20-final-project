import {
  FIND_USER_BY_ID,
  REGISTER,
  LOGIN,
  UPDATE_USER,
  GET_CURRENT_USER,
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
