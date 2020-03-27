import {
  COMMENT_API_URL,
  MOVIE_COMMENTS_API_URL, REVIEW_API_URL,
  USER_COMMENTS_API_URL
} from "../common/constants";

export const createComment = (movieId, comment) =>
  fetch(MOVIE_COMMENTS_API_URL(movieId), {
    method: "POST",
    body: JSON.stringify(comment),
    credentials:"include",
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const deleteComment = (commentId) =>
  fetch(`${COMMENT_API_URL}/${commentId}`, {
    method: "DELETE",
    credentials:"include",
  }).then(response => response.json());

export const updateComment = (commentId, comment) =>
  fetch(`${COMMENT_API_URL}/${commentId}`, {
    method: "PUT",
    credentials:"include",
    body: JSON.stringify(comment),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const findAllCommentsByMovieId = (movieId) =>
  fetch(MOVIE_COMMENTS_API_URL(movieId))
    .then(response => response.json());

export const findAllCommentsByUserId = (userId) =>
  fetch(USER_COMMENTS_API_URL(userId))
    .then(response => response.json());


export default {
  createComment,
  deleteComment,
  updateComment,
  findAllCommentsByMovieId,
  findAllCommentsByUserId
}
