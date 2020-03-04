import {FIND_MOVIE_BY_ID} from "../common/constants";

const movieDetailReducer = (state = {movie: "", comments: [], reviews: []}, action) => {
  switch (action.type) {
    case FIND_MOVIE_BY_ID:
      return {
        movie: action.movie,
        comments: state.comments,
        reviews: state.reviews
      };
    default:
      return state
  }
};

export default movieDetailReducer
