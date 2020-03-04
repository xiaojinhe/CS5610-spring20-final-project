export const TMDb_API_KEY = "dc779fdd680071c77d81b911adeed900";

export const TMDb_API = "https://api.themoviedb.org/3";

export const TMDb_MOVIE_API = `${TMDb_API}/movie`;

export const TMDb_SEARCH_API = `${TMDb_API}/search`;

export const TMDb_MOVIE_TOP_RATED_URL =
    `${TMDb_MOVIE_API}/top_rated?api_key=${TMDb_API_KEY}&language=en-US&page=1`;

export const TMDb_MOVIE_NOW_PLAYING_URL =
    `${TMDb_MOVIE_API}/now_playing?api_key=${TMDb_API_KEY}&language=en-US&page=1`;

export const TMDb_IMAGE_URL = (poster_path) =>
    `https://image.tmdb.org/t/p/w500${poster_path}`;

export const TMDb_SEARCH_MOVIE_URL = (query) =>
    `${TMDb_SEARCH_API}/movie?api_key=${TMDb_API_KEY}&language=en-US&query=${query}`;