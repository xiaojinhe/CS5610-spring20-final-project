import {
  FAVORITE_MOVIE,
  FIND_ALL_MOVIE_INFO_BY_ID, FIND_COMMENTS_FOR_MOVIE,
  FIND_MOVIE_BY_ID,
  FIND_REVIEWS_FOR_MOVIE, RATE_MOVIE, TOGGLE_FAVORITE
} from "../common/constants";

export const findMovieById = (movie) => ({
  movie: movie,
  type: FIND_MOVIE_BY_ID
});

export const findReviewsForMovie = (reviews) => ({
  reviews: reviews,
  type: FIND_REVIEWS_FOR_MOVIE
});

export const findAllMovieInfoById = (movie, comments, reviews) => ({
  movie: movie,
  comments: comments,
  reviews: reviews,
  type:FIND_ALL_MOVIE_INFO_BY_ID
});

export const findCommentsForMovie = (comments) => ({
  comments: comments,
  type: FIND_COMMENTS_FOR_MOVIE
});

export const rateMovie = (rate) => ({
  rate: rate,
  type: RATE_MOVIE
});

export const toggleFavorite = () => ({
  type: TOGGLE_FAVORITE
});
