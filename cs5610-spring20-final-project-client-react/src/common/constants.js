export const TMDb_API_KEY = "dc779fdd680071c77d81b911adeed900";

export const TMDb_API = "https://api.themoviedb.org/3";

export const TMDb_MOVIE_API = `${TMDb_API}/movie`;

export const TMDb_MOVIE_TOP_RATED =
    `${TMDb_MOVIE_API}/top_rated?api_key=${TMDb_API_KEY}&language=en-US&page=1`;

export const TMDb_MOVIE_NOW_PLAYING =
    `${TMDb_MOVIE_API}/now_playing?api_key=${TMDb_API_KEY}&language=en-US&page=1`;

export const TMDb_IMAGE_BASE_URL =
    (poster_path) => `https://image.tmdb.org/t/p/w300${poster_path}`;