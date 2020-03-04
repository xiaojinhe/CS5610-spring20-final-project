import service from "../services/MovieDetailService";
import {findMovieById} from "../actions/MovieDetailActions";
import MovieDetailComponent from "../components/MovieDetailComponent";

const stateToPropertyMapper = (state) => ({
  movie: state.movieDetail.movie,
  comments: state.movieDetail.comments,
  reviews: state.movieDetail.reviews
});

const dispatchToPropertyMapper = (dispatch) => ({
  findMovieById: async (movieId) => {
    const movie = await service.findMovieById(movieId);
    dispatch(findMovieById(movie));
  }
});

const MovieDetailContainer = connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(MovieDetailComponent);

export default MovieDetailContainer

