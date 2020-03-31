import {
  FAVORITE_MOVIE,
  FIND_ALL_MOVIE_INFO_BY_ID, FIND_COMMENTS_FOR_MOVIE,
  FIND_MOVIE_BY_ID,
  FIND_REVIEWS_FOR_MOVIE, RATE_MOVIE, SET_MOVIE_AS_FAVORITE, SET_MOVIE_NOT_FAVORITE
} from "../common/constants";

export const findMovieById = (movie) => ({
  movie: movie,
  type: FIND_MOVIE_BY_ID
});

export const findReviewsForMovie = (reviews) => ({
  reviews: reviews,
  type: FIND_REVIEWS_FOR_MOVIE
});

export const findAllMovieInfoById = (movie, comments, reviews, publicReviews) => ({
  movie: movie,
  comments: comments,
  reviews: reviews,
  publicReviews: publicReviews,
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

export const setMovieAsFavoriteAction = () => ({
  type: SET_MOVIE_AS_FAVORITE
});

export const setMovieNotFavoriteAction = () => ({
  type: SET_MOVIE_NOT_FAVORITE
})
