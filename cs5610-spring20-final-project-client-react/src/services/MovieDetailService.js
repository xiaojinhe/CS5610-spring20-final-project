import {MOVIE_DETAIL_API_URL, MOVIE_REVIEWS_API_URL} from "../common/constants";

export const findMovieById = async (movieId) => {
  const response = await fetch(MOVIE_DETAIL_API_URL(movieId))
    .then(response => response.json());
  let directors = [];
  let writers = [];
  response.credits.crew.forEach(entry => {
    if (entry.job === 'Director') {
      directors.push(entry.name);
    } else if (entry.job === 'Novel' || entry.job === 'Screenplay') {
      writers.push(entry.name);
    }
  });
  response.directors = directors;
  response.writers = writers;
  console.log(response.directors);
  return response;
};

export const findReviewsForMovie = async (movieTitle) => {
  const response = await fetch(MOVIE_REVIEWS_API_URL(movieTitle));
  return await response.json();
};

export default {
  findMovieById, findReviewsForMovie
}