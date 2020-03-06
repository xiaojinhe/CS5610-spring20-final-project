
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

export const NYTIMES_MOVIE_REVIEW_URL = `https://api.nytimes.com/svc/movies/v2/reviews/pick.json?api-key=${NYT_API_KEY}`;

export const TMDB_SEARCH_MOVIE_URL = (query) =>
    `${TMDB_SEARCH_API}/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}`;

export const MOVIE_DETAIL_API_URL =
    (movieId) => `${TMDB_API}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,similar`;
export const MOVIE_TRAILER_API_URL =
    (key) => `https://www.youtube.com/embed/${key}`;

//TODO: NEED TO REPLACE WITH REAL COMMENTS API
export const MOVIE_COMMENTS_API_URL =
    (movieId) => `${TMDB_API}/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`;

export const MOVIE_REVIEWS_API_URL =
    (movieTitle) => `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${movieTitle}&api-key=${NYT_API_KEY}`;

export const FIND_MOVIE_BY_ID = "FIND_MOVIE_BY_ID";
export const FIND_REVIEWS_FOR_MOVIE = "FIND_REVIEWS_FOR_MOVIE";
export const FIND_COMMENTS_FOR_MOVIE = "FIND_COMMENTS_FOR_MOVIE";
export const FIND_ALL_MOVIE_INFO_BY_ID = "FIND_ALL_MOVIE_INFO_BY_ID";
export const RATE_MOVIE = "RATE_MOVIE";
export const FAVORITE_MOVIE = "FAVORITE_MOVIE";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

//action type for user
export const FIND_USER_BY_ID = "FIND_USER_BY_ID";

// action for login and register
export const REGISTER = "REGISTER";

