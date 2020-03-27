import {USER_API_URL} from "../common/constants";

/* ====== for user authentication====== */
export const registerUser = (user) =>
  fetch(USER_API_URL, {
    method: "POST",
    body: JSON.stringify(user),
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

//TODO: use actual url
export const userLogin = (username, password) =>
  fetch("", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password
    }),
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

//TODO: use actual url
export const getCurrentUser = () =>
  fetch("")
    .then(response => response.json());

export const findUserById = (uid) =>
  fetch(`${USER_API_URL}/${uid}`)
    .then(response => response.json());

export const updateUser = (uid, user) =>
  fetch(`${USER_API_URL}/${uid}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

//get all follows
export const findAllFollowsByUserId = (uid) =>
  fetch(`${USER_API_URL}/${uid}/follows`)
    .then(response => response.json());

//get all fans
export const findAllFollowersByUserId = (uid) =>
  fetch(`${USER_API_URL}/${uid}/fans`)
    .then(response => response.json());

export const followUser = (uid, user) =>
  fetch(`${USER_API_URL}/${uid}/follows`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())

export const unfollowUser = (uid, criticId) =>
  fetch(`${USER_API_URL}/${uid}/follows/${criticId}`, {
    method: "DELETE"
  }).then(response => response.json())


//get user's favorite movies
export const getFavoriteMoviesForUser = (uid) =>
  fetch(`${USER_API_URL}/${uid}/favorites`)
    .then(response => response.json())

//get user's liked reviews
export const getLikedReviewsForUser = (uid) =>
  fetch(`${USER_API_URL}/${uid}/likedReviews`)
    .then(response => response.json());


export default {
  findUserById,
  userLogin,
  registerUser,
  updateUser,
  getCurrentUser,
  findAllFollowsByUserId,
  findAllFollowersByUserId,
  followUser,
  unfollowUser,
  getFavoriteMoviesForUser,
  getLikedReviewsForUser
}
