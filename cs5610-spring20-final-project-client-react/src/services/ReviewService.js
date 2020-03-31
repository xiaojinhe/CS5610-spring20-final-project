import {
  MOVIE_REVIEWS_API_URL, MOVIE_TIME_BASE_URL, NYTIMES_MOVIE_REVIEW_URL, NYTIMES_MOVIE_REVIEWS_API_URL,
  REVIEW_API_URL,
  USER_REVIEWS_API_URL
} from "../common/constants";

export const createReview = (movieId, review) =>
  fetch(MOVIE_REVIEWS_API_URL(movieId), {
    method: "POST",
    body: JSON.stringify(review),
    credentials:"include",
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const getReviewById = (reviewId) =>
  fetch(`${REVIEW_API_URL}/${reviewId}`)
    .then(response => response.json());

export const deleteReview = (reviewId) =>
  fetch(`${REVIEW_API_URL}/${reviewId}`, {
    method: "DELETE",
    credentials:"include",
  });

export const updateReivew = (reviewId, review) =>
  fetch(`${REVIEW_API_URL}/${reviewId}`, {
    method: "PUT",
    credentials:"include",
    body: JSON.stringify(review),
    headers: {
      'content-type': 'application/json'
    }
  });

export const findAllReviewsByMovieId = (movieId) =>
  fetch(MOVIE_REVIEWS_API_URL(movieId))
    .then(response => response.json());


export const findAllReviewsByUserId = (userId) =>
  fetch(USER_REVIEWS_API_URL(userId))
    .then(response => response.json());

export const likeReview = (reviewId) =>
  fetch(`${REVIEW_API_URL}/${reviewId}/likes`, {
    method: "POST",
    credentials:"include",
    headers: {
      'content-type': 'application/json'
    }
  });

export const cancelLikeReview = (reviewId) =>
  fetch(`${REVIEW_API_URL}/${reviewId}/likes`, {
    method: 'DELETE',
    credentials:"include",
  });

export const findMostLikedReview = () =>
  fetch(`${MOVIE_TIME_BASE_URL}/api/mostLikedReviews`)
    .then(response => response.json());


//TODO: may delete when implement our own most liked reviews
export const findPublicReviewsForMovie = async (movieTitle) => {
  const response = await fetch(NYTIMES_MOVIE_REVIEWS_API_URL(movieTitle));
  return await response.json();
};

export default {
  createReview,
  deleteReview,
  updateReivew,
  getReviewById,
  findAllReviewsByMovieId,
  findAllReviewsByUserId,
  likeReview,
  cancelLikeReview,
  findMostLikedReview,
  findPublicReviewsForMovie
}
