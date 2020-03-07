import {
  MOVIE_COMMENTS_API_URL,
  MOVIE_DETAIL_API_URL,
  MOVIE_REVIEWS_API_URL
} from "../common/constants";

export const findMovieById = async (movieId) => {
  const response = await fetch(MOVIE_DETAIL_API_URL(movieId))
    .then(response => response.json());
  let directors = [];
  let writers = [];
  response.credits.crew.forEach(entry => {
    if (entry.job === 'Director') {
      directors.push(entry.name);
    } else if (entry.job === 'Novel' || entry.job === 'Screenplay' || entry.job === 'Writer') {
      writers.push(entry.name);
    }
  });
  response.directors = directors;
  response.writers = writers;
  response.stars = response.credits.cast.slice(0, 5);
  return response;
};

export const findReviewsForMovie = async (movieTitle) => {
  const response = await fetch(MOVIE_REVIEWS_API_URL(movieTitle));
  return await response.json();
};

export const findCommentsForMovie = async (movieId) => {
  const response = await fetch(MOVIE_COMMENTS_API_URL(movieId));
  return await response.json();
};

export default {
  findMovieById, findReviewsForMovie, findCommentsForMovie
}