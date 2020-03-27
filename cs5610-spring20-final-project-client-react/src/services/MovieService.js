import {
  MOVIE_API_URL,
  MOVIE_DETAIL_API_URL,
  TMDB_MOVIE_NOW_PLAYING_URL,
  TMDB_MOVIE_TOP_RATED_URL,
  TMDB_SEARCH_MOVIE_URL
} from "../common/constants";

/* ====== Using TMDB Service=====*/
export const findTopRatedMovies = () =>
  fetch(TMDB_MOVIE_TOP_RATED_URL).then(
    response => response.json()
  );

export const findNowPlayingMovies = () =>
  fetch(TMDB_MOVIE_NOW_PLAYING_URL).then(
    response => response.json()
  );

export const searchMovies = (criteria) =>
  fetch(TMDB_SEARCH_MOVIE_URL(criteria)).then(
    response => response.json()
  );

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

/* ====== Using our own service=====*/
export const addMovieToUserFavorites = (movieId, movie) =>
  fetch(`${MOVIE_API_URL}/${movieId}/favorites`, {
    method: "POST",
    body: JSON.stringify(movie),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const removeMovieFromUserFavorites = (movieId) =>
  fetch(`${MOVIE_API_URL}/${movieId}/favorites`, {
    method: "DELETE"
  }).then(response => response.json());

export const rateMovie = (movieId, rating) =>
  fetch(`${MOVIE_API_URL}/${movieId}/ratings`, {
    method: "POST",
    body: JSON.stringify(rating),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export default {
  findTopRatedMovies,
  findNowPlayingMovies,
  searchMovies,
  findMovieById,
  addMovieToUserFavorites,
  removeMovieFromUserFavorites,
  rateMovie
}
