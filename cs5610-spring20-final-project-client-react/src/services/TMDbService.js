import {TMDb_MOVIE_NOW_PLAYING, TMDb_MOVIE_TOP_RATED} from "../common/constants";

export const findTopRatedMovies = () =>
    fetch(TMDb_MOVIE_TOP_RATED).then(
        response => response.json()
    );

export const findNowPlayingMovies = () =>
    fetch(TMDb_MOVIE_NOW_PLAYING).then(
        response => response.json()
    );


export default {
    findTopRatedMovies,
    findNowPlayingMovies
}