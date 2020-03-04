import {
  FIND_ALL_MOVIE_INFO_BY_ID,
  FIND_MOVIE_BY_ID,
  FIND_REVIEWS_FOR_MOVIE
} from "../common/constants";

const movieDetailReducer = (state = {movie: "", comments: [], reviews: []}, action) => {
  switch (action.type) {
    case FIND_MOVIE_BY_ID:
      return {
        movie: action.movie,
        comments: state.comments,
        reviews: state.reviews
      };
    case FIND_REVIEWS_FOR_MOVIE:
      return {
        movie: state.movie,
        comments: state.comments,
        reviews: action.reviews
      };
    case FIND_ALL_MOVIE_INFO_BY_ID:
      return {
        movie: action.movie,
        comments: action.comments,
        reviews: action.reviews
      };
    default:
      return state
  }
};

export default movieDetailReducer
