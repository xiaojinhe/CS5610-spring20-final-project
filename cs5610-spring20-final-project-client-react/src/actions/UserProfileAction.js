import {FIND_USER_BY_ID, USER_LOGIN} from "../common/constants";

export const findUserByIdAction = (user) => ({
    type: FIND_USER_BY_ID,
    user: user
});

export const userLoginAction = (user) => ({
    type: USER_LOGIN,
    user: user
});