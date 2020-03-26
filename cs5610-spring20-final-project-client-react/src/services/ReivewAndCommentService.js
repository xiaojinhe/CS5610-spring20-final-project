import {MOVIE_API_URL, USER_API_URL} from "../common/constants";

//TODO: may change due to server change because createReview and createComment may share same url?
export const createReview = (movieId, review) =>
  fetch(`${MOVIE_API_URL}/${movieId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());


export const createComment = (movieId, comment) =>
  fetch(`${MOVIE_API_URL}/${movieId}/comments`, {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const deleteReview = (movieId, reviewId) =>
  fetch(`${MOVIE_API_URL}/${movieId}/reviews`, {
    method: "DELETE"
  }).then(response => response.json());

export const deleteComment = (movieId, commentId) =>
  fetch(`${MOVIE_API_URL}/${movieId}/comments`, {
    method: "DELETE"
  }).then(response => response.json());


/* ============ Find by Movie ============= */

export const findAllReviewsByMovieId = (movieId) =>
  fetch(`${MOVIE_API_URL}/${movieId}/reviews`)
    .then(response => response.json());

export const findAllCommentsByMovieId = (movieId) =>
  fetch(`${MOVIE_API_URL}/${movieId}/comments`)
    .then(response => response.json());

/* ============ Find by User ============= */
//TODO: may change due to server API change
export const findAllReviewsByUserId = (userId) =>
  fetch(`${USER_API_URL}/${userId}/comments`)
    .then(response => response.json());

export const findAllCommentsByUserId = (userId) =>
  fetch(`${USER_API_URL}/${userId}/reviews`)
    .then(response => response.json());

export const findAllLikedReviewsForUser = (userId) =>
  fetch(`${USER_API_URL}/${userId}/likedReviews`)
    .then(response => response.json());

export const likeReview = (userId, reviewId) =>
  fetch("", {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export default {
  createReview,
  createComment,
  deleteReview,
  deleteComment,
  findAllReviewsByMovieId,
  findAllCommentsByMovieId,
  findAllReviewsByUserId,
  findAllCommentsByUserId,
  findAllLikedReviewsForUser,
  likeReview
}
