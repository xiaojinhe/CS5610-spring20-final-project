import {FIND_USER_BY_ID} from "../common/constants";

export const findUserByIdAction = (user) => ({
    type: FIND_USER_BY_ID,
    user: user
});