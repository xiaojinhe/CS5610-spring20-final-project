import {FIND_USER_BY_ID, REGISTER, LOGIN, UPDATE_USER} from "../common/constants";

export const findUserByIdAction = (user) => ({
  type: FIND_USER_BY_ID,
  user: user
});

export const loginUserAction = (user) => ({
  type: LOGIN,
  loggedInUser: user
});

export const registerUser = (username, password, role, email, phone) => ({
  type: REGISTER,
  registerUser: {username, password, role, email, phone}
});

export const updateUserAction = (user) => ({
  type: UPDATE_USER,
  updatedUser: user
});