export const TMDB_API = "https://api.themoviedb.org/3";

const TMDB_API_KEY = "dc779fdd680071c77d81b911adeed900";
const NYT_API_KEY = "kAsxh51CHkFdmA0YV8ifKEJwEvbF0Ux9";

export const TMDB_MOVIE_API = `${TMDB_API}/movie`;

export const TMDB_SEARCH_API = `${TMDB_API}/search`;

export const TMDB_MOVIE_TOP_RATED_URL =
  `${TMDB_MOVIE_API}/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

export const TMDB_MOVIE_NOW_PLAYING_URL =
  `${TMDB_MOVIE_API}/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

export const TMDB_IMAGE_URL = (width, poster_path) => {
  if (poster_path) {
    return `https://image.tmdb.org/t/p/w${width}${poster_path}`;
  } else {
    return "../movie_poster_default.jpg";
  }
};

export const USER_ICON_PATH = "../user_icon_img.png";

export const NYTIMES_MOVIE_REVIEW_URL = `https://api.nytimes.com/svc/movies/v2/reviews/pick.json?api-key=${NYT_API_KEY}`;

export const TMDB_SEARCH_MOVIE_URL = (query) =>
  `${TMDB_SEARCH_API}/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`;

export const MOVIE_DETAIL_API_URL =
  (movieId) => `${TMDB_API}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,similar`;
export const MOVIE_TRAILER_API_URL =
  (key) => `https://www.youtube.com/embed/${key}`;

/* =========== API for MovieTime Service ========= */
export const MOVIE_TIME_BASE_URL = "http://localhost:3000"

export const USER_API_URL = `${MOVIE_TIME_BASE_URL}/api/users`
export const MOVIE_API_URL = `${MOVIE_TIME_BASE_URL}/api/movies`
export const REVIEW_API_URL = `${MOVIE_TIME_BASE_URL}/api/reviews`
export const COMMENT_API_URL = `${MOVIE_TIME_BASE_URL}/api/comments`

export const USER_COMMENTS_API_URL =
  (userId) => `${MOVIE_TIME_BASE_URL}/api/users/${userId}/comments`

export const USER_REVIEWS_API_URL =
  (userId) => `${MOVIE_TIME_BASE_URL}/api/users/${userId}/reviews`

export const MOVIE_COMMENTS_API_URL =
  (movieId) => `${MOVIE_TIME_BASE_URL}/api/movies/${movieId}/comments`

export const MOVIE_REVIEWS_API_URL =
  (movieId) => `${MOVIE_TIME_BASE_URL}/api/movies/${movieId}/reviews`


/* =========== Redux action type =========*/
export const FIND_MOVIE_BY_ID = "FIND_MOVIE_BY_ID";
export const FIND_REVIEWS_FOR_MOVIE = "FIND_REVIEWS_FOR_MOVIE";
export const FIND_COMMENTS_FOR_MOVIE = "FIND_COMMENTS_FOR_MOVIE";
export const FIND_ALL_MOVIE_INFO_BY_ID = "FIND_ALL_MOVIE_INFO_BY_ID";
export const RATE_MOVIE = "RATE_MOVIE";
export const FAVORITE_MOVIE = "FAVORITE_MOVIE";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

//action type for user profile
export const FIND_USER_BY_ID = "FIND_USER_BY_ID";
export const UPDATE_USER = "UPDATE_USER"

// action for login and register
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";

export const CRITIC_USER = "CRITIC"
export const REGULAR_USER = "REGULAR"
