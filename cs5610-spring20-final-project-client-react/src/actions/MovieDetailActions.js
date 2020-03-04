import {FIND_MOVIE_BY_ID} from "../common/constants";

export const findMovieById = (movie) => ({
  movie: movie,
  type: FIND_MOVIE_BY_ID
});