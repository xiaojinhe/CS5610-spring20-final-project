import {
  FAVORITE_MOVIE,
  FIND_ALL_MOVIE_INFO_BY_ID, FIND_COMMENTS_FOR_MOVIE,
  FIND_MOVIE_BY_ID,
  FIND_REVIEWS_FOR_MOVIE, TOGGLE_FAVORITE
} from "../common/constants";

const movieDetailReducer = (state = {movie: "", comments: [], reviews: [], favorite: false}, action) => {
  switch (action.type) {
    case FIND_MOVIE_BY_ID:
      return {
        movie: action.movie,
        comments: state.comments,
        reviews: state.reviews,
        favorite: state.favorite
      };
    case FIND_REVIEWS_FOR_MOVIE:
      return {
        movie: state.movie,
        comments: state.comments,
        reviews: action.reviews,
        favorite: state.favorite
      };
    case FIND_ALL_MOVIE_INFO_BY_ID:
      return {
        movie: action.movie,
        comments: action.comments,
        reviews: action.reviews,
        favorite: state.favorite
      };
    case FIND_COMMENTS_FOR_MOVIE:
      return {
        movie: state.movie,
        comments: action.comments,
        reviews: state.reviews,
        favorite: state.favorite
      };
    case TOGGLE_FAVORITE:
      return  {
        movie: state.movie,
        comments: state.comments,
        reviews: state.reviews,
        favorite: !state.favorite
      };
    default:
      return state
  }
};

export default movieDetailReducer
