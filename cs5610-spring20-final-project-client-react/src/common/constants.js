const TMDB_API_KEY = "dc779fdd680071c77d81b911adeed900";
const NYT_API_KEY = "kAsxh51CHkFdmA0YV8ifKEJwEvbF0Ux9";

export const MOVIE_DETAIL_API_URL =
  (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits`;
export const MOVIE_POSTER_PATH_API_URL =
  (size, posterPath) =>  `http://image.tmdb.org/t/p/${size}/${posterPath}`;

export const MOVIE_REVIEWS_API_URL =
  (movieTitle) => `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${movieTitle}&api-key=${NYT_API_KEY}`;

export const FIND_MOVIE_BY_ID = "FIND_MOVIE_BY_ID";
export const FIND_REVIEWS_FOR_MOVIE = "FIND_REVIEWS_FOR_MOVIE";
export const FIND_ALL_MOVIE_INFO_BY_ID = "FIND_ALL_MOVIE_INFO_BY_ID";
