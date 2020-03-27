import {
  MOVIE_REVIEWS_API_URL,
  REVIEW_API_URL,
  USER_REVIEWS_API_URL
} from "../common/constants";

export const createReview = (movieId, review) =>
  fetch(MOVIE_REVIEWS_API_URL(movieId), {
    method: "POST",
    body: JSON.stringify(review),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const getReviewById = (reviewId) =>
  fetch(`${REVIEW_API_URL}/${reviewId}`)
    .then(response => response.json());

export const deleteReview = (reviewId) =>
  fetch(`${REVIEW_API_URL}/${reviewId}`, {
    method: "DELETE"
  }).then(response => response.json());

export const updateReivew = (reviewId, review) =>
  fetch(`${REVIEW_API_URL}/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify(review),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const findAllReviewsByMovieId = (movieId) =>
  fetch(MOVIE_REVIEWS_API_URL(movieId))
    .then(response => response.json());


export const findAllReviewsByUserId = (userId) =>
  fetch(USER_REVIEWS_API_URL(userId))
    .then(response => response.json());

export const likeReview = (reviewId) =>
  fetch(`${REVIEW_API_URL}/${reviewId}/likes`, {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())

export const cancelLikeReview = (reviewId) =>
  fetch(`${REVIEW_API_URL}/${reviewId}/likes`, {
    method: 'DELETE'
  }).then(response => response.json());


export default {
  createReview,
  deleteReview,
  updateReivew,
  getReviewById,
  findAllReviewsByMovieId,
  findAllReviewsByUserId,
  likeReview,
  cancelLikeReview
}
