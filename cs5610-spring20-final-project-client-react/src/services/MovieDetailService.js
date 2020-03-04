import {MOVIE_DETAIL_API_URL} from "../common/constants";

export const findMovieById = async (movieId) => {
  const response = await fetch(MOVIE_DETAIL_API_URL(movieId));
  return await response.json();
};

export default {
  findMovieById
}