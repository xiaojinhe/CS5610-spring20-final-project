import {MOVIE_DETAIL_API_URL, MOVIE_REVIEWS_APT_URL} from "../common/constants";

export const findMovieById = async (movieId) => {
  const response = await fetch(MOVIE_DETAIL_API_URL(movieId));
  return await response.json();
};

export const findReviewsForMovie = async (movieTitle) => {
  const response = await fetch(MOVIE_REVIEWS_APT_URL(movieTitle));
  return await response.json();
};

export default {
  findMovieById, findReviewsForMovie
}