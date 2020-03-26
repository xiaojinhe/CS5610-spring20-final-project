import {
  toggleFavorite,
  findAllMovieInfoById,
  findMovieById,
  findReviewsForMovie,
  findCommentsForMovie
} from "../actions/MovieDetailActions";
import MovieDetailComponent from "../components/MovieDetailComponents/MovieDetailComponent";
import {connect} from "react-redux";
import ReviewAndCommentService from "../services/ReivewAndCommentService";
import MovieService from "../services/MovieService";

const stateToPropertyMapper = (state) => ({
  movie: state.movieDetail.movie,
  comments: state.movieDetail.comments,
  reviews: state.movieDetail.reviews,
  favorite: state.movieDetail.favorite
});

const dispatchToPropertyMapper = (dispatch) => {
  return ({
    findMovieById: async (movieId) => {
      const movie = await MovieService.findMovieById(movieId);
      dispatch(findMovieById(movie));
    },
    findReviewsForMovie: async (movieId) => {
      const reviews = await ReviewAndCommentService.findAllReviewsByMovieId(movieId)
        .then(response => response.results);
      dispatch(findReviewsForMovie(reviews));
    },
    findAllMovieInfoById: async (movieId) => {
      const movie = await MovieService.findMovieById(movieId);
      //TODO: switch to use our own api's reviews
      const reviews = await ReviewAndCommentService.findAllReviewsByMovieId(movieId);
      //TODO: need to add comments fetch from our own api
      const comments = await ReviewAndCommentService.findAllCommentsByMovieId(movieId);
      dispatch(findAllMovieInfoById(movie, comments, reviews));
    },
    findCommentsForMovie: async (movieId) => {
      const comments = await ReviewAndCommentService.findAllCommentsByMovieId(movieId);
      dispatch(findCommentsForMovie(comments));
    },
    toggleFavorite: () => {
      dispatch(toggleFavorite())
    }
  });
};

const MovieDetailContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(MovieDetailComponent);

export default MovieDetailContainer

