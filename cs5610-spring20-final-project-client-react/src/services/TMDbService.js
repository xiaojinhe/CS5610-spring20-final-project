import {
    TMDb_MOVIE_NOW_PLAYING_URL,
    TMDb_MOVIE_TOP_RATED_URL,
    TMDb_SEARCH_MOVIE_URL
} from "../common/constants";

export const findTopRatedMovies = () =>
    fetch(TMDb_MOVIE_TOP_RATED_URL).then(
        response => response.json()
    );

export const findNowPlayingMovies = () =>
    fetch(TMDb_MOVIE_NOW_PLAYING_URL).then(
        response => response.json()
    );

export const searchMovies = (criteria) =>
    fetch(TMDb_SEARCH_MOVIE_URL(criteria)).then(
        response => response.json()
    );

export default {
    findTopRatedMovies,
    findNowPlayingMovies
}