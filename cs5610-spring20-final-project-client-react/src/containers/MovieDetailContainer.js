import service from "../services/MovieDetailService";
import {
  findAllMovieInfoById,
  findMovieById,
  findReviewsForMovie
} from "../actions/MovieDetailActions";
import MovieDetailComponent from "../components/MovieDetailComponent";
import {connect} from "react-redux";

const stateToPropertyMapper = (state) => ({
  movie: state.movieDetail.movie,
  comments: state.movieDetail.comments,
  reviews: state.movieDetail.reviews
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
    const reviews = await service.findReviewsForMovie(movie.title);
    //TODO: need to add comments fetch from our own api
    dispatch(findAllMovieInfoById(movie, [], reviews));
  }
});

const MovieDetailContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(MovieDetailComponent);

export default MovieDetailContainer

