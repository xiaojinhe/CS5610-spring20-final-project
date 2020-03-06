import {FIND_USER_BY_ID, REGISTER} from "../common/constants";

export const findUserByIdAction = (user) => ({
    type: FIND_USER_BY_ID,
    user: user
});

export const registerUser = (username, password, role, email, phone) => ({
    type: REGISTER,
    registerUser: {username, password, role, email, phone}
});