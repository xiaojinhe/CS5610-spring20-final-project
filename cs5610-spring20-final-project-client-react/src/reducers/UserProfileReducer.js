import {FIND_USER_BY_ID, REGISTER} from "../common/constants";

const userProfileReducer = (state = {user: "", registerUser: ""}, action) => {
    switch (action.type) {
        case FIND_USER_BY_ID:
            return {
                ...state,
                user: action.user,
                registerUser: state.registerUser
            };
        case REGISTER:
            return {
                ...state,
                user: state.user,
                registerUser: action.registerUser
            };
        default:
            return state

    }
};

export default userProfileReducer