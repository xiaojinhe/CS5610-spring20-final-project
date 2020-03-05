import {NYTIMES_MOVIE_REVIEW_URL} from "../common/constants";

export const findCriticPickedMovieReviews = () =>
    fetch(NYTIMES_MOVIE_REVIEW_URL)
        .then(response => response.json());

export default {
    findCriticPickedMovieReviews
}