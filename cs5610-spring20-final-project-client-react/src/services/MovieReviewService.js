import {NYTIMES_MOVIE_REVIEW_URL} from "../common/constants";

//TODO: may delete when implement our own most liked reviews
export const findCriticPickedMovieReviews = () =>
    fetch(NYTIMES_MOVIE_REVIEW_URL)
        .then(response => response.json());

export default {
    findCriticPickedMovieReviews
}
