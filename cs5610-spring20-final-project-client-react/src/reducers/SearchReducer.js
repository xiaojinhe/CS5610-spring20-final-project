import {SET_SEARCH_RESULT} from "../common/constants";

const searchReducer = (state = {searchResults: []}, action) => {
    switch (action.type) {
        case SET_SEARCH_RESULT:
            return ({
                ...state,
                searchResults: action.results
            });
        default:
            return state
    }
};

export default searchReducer
