import service, {findCommentsForMovie} from "../services/MovieDetailService";
import reviewAndCommentService from "../services/ReivewAndCommentService"
import {
  toggleFavorite,
  findAllMovieInfoById,
  findMovieById,
  findReviewsForMovie
} from "../actions/MovieDetailActions";
import MovieDetailComponent from "../components/MovieDetailComponents/MovieDetailComponent";
import {connect} from "react-redux";

const stateToPropertyMapper = (state) => ({
  movie: state.movieDetail.movie,
  comments: state.movieDetail.comments,
  reviews: state.movieDetail.reviews,
  favorite: state.movieDetail.favorite
});

const dispatchToPropertyMapper = (dispatch) => ({
  findMovieById: async (movieId) => {
    const movie = await service.findMovieById(movieId);
    dispatch(findMovieById(movie));
  },
  findReviewsForMovie: async (movieTitle) => {
    const reviews = await service.findReviewsForMovie(movieTitle)
      .then(response => response.results);
    dispatch(findReviewsForMovie(reviews));
  },
  findAllMovieInfoById: async (movieId) => {
    const movie = await service.findMovieById(movieId);
    //TODO: switch to use our own api's reviews
    const reviews = await reviewAndCommentService.findAllReviewsByMovieId(movieId);
    //TODO: need to add comments fetch from our own api
    const comments = await reviewAndCommentService.findAllCommentsByMovieId(movieId);
    dispatch(findAllMovieInfoById(movie, comments, reviews));
  },
  findCommentsForMovie: async (movieId) => {
    const comments = await reviewAndCommentService.findAllCommentsByMovieId(movieId);
    dispatch(findCommentsForMovie(comments));
  },
  toggleFavorite: () => {
    dispatch(toggleFavorite())
  }
});

const MovieDetailContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(MovieDetailComponent);

export default MovieDetailContainer

