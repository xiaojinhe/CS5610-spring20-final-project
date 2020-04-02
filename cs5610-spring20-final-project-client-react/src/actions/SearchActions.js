import {SET_SEARCH_RESULT} from "../common/constants";

export const setSearchResultAction = (results) =>
    ({
        type: SET_SEARCH_RESULT,
        results: results

    })
