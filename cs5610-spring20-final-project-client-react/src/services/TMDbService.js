import {
    TMDB_MOVIE_NOW_PLAYING_URL,
    TMDB_MOVIE_TOP_RATED_URL,
    TMDB_SEARCH_MOVIE_URL
} from "../common/constants";

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

export default {
    findTopRatedMovies,
    findNowPlayingMovies
}