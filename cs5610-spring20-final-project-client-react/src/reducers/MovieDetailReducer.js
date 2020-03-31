import {
  FIND_ALL_MOVIE_INFO_BY_ID, FIND_COMMENTS_FOR_MOVIE,
  FIND_MOVIE_BY_ID,
  FIND_REVIEWS_FOR_MOVIE, SET_MOVIE_AS_FAVORITE, SET_MOVIE_NOT_FAVORITE
} from "../common/constants";

const movieDetailReducer = (state = {movie: "", comments: [], reviews: [], publicReviews:[], favorite: false}, action) => {
  switch (action.type) {
    case FIND_MOVIE_BY_ID:
      return {
        movie: action.movie,
        comments: state.comments,
        reviews: state.reviews,
        publicReviews: state.publicReviews,
        favorite: state.favorite
      };
    case FIND_REVIEWS_FOR_MOVIE:
      return {
        movie: state.movie,
        comments: state.comments,
        reviews: action.reviews,
        favorite: state.favorite,
        publicReviews: state.publicReviews,
      };
    case FIND_ALL_MOVIE_INFO_BY_ID:
      return {
        movie: action.movie,
        comments: action.comments,
        reviews: action.reviews,
        favorite: state.favorite,
        publicReviews: action.publicReviews
      };
    case FIND_COMMENTS_FOR_MOVIE:
      return {
        movie: state.movie,
        comments: action.comments,
        reviews: state.reviews,
        favorite: state.favorite,
        publicReviews: state.publicReviews
      };
    case SET_MOVIE_AS_FAVORITE:
      return  {
        ...state,
        favorite: true
      };
    case SET_MOVIE_NOT_FAVORITE:
      return {
        ...state,
        favorite: false
      };
    default:
      return state
  }
};

export default movieDetailReducer
