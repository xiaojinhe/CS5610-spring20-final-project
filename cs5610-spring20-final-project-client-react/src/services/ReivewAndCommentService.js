//TODO: may change due to server change because createReview and createComment may share same url?
export const createReview = (userId, review) =>
  fetch("", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const deleteReview = (userId, reviewId) =>
  fetch("", {
    method: "DELETE"
  }).then(response => response.json());

export const deleteComment = (userId, commentId) =>
  fetch("", {
    method: "DELETE"
  }).then(response => response.json());


/* ============ Find by Movie ============= */
import {USER_API_URL} from "../common/constants";

export const findAllReviewsByMovieId = (tmbdId) =>
  fetch("")
    .then(response => response.json());

export const findAllCommentsByMovieId = (tmdbId) =>
  fetch("")
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
  findCommentsOrReviewsByUserId,
  findAllReviewsByMovieId,
  findAllCommentsByMovieId,
  findAllReviewsByUserId,
  findAllCommentsByUserId,
  findAllLikedReviewsForUser,
  likeReview
}
