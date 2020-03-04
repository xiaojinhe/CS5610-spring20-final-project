const API_KEY = "dc779fdd680071c77d81b911adeed900";
export const MOVIE_DETAIL_API_URL =
  (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

export const FIND_MOVIE_BY_ID = "FIND_MOVIE_BY_ID";
