import {MOVIE_TIME_BASE_URL, USER_API_URL} from "../common/constants";

/* ====== for user authentication====== */
export const register = (user) =>
  fetch(`${MOVIE_TIME_BASE_URL}/api/register`, {
    method: "POST",
    body: JSON.stringify(user),
    credentials: "include",
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const login = (user) =>
  fetch(`${MOVIE_TIME_BASE_URL}/api/login`, {
    method: "POST",
    body: JSON.stringify(user),
    credentials: "include",
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => {
    if (response.status === 401) {
      return null;
    } else {
      return response.json()
    }
  });

export const logout = () =>
  fetch(`${MOVIE_TIME_BASE_URL}/api/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      'content-type': 'application/json'
    }
  });

export const getCurrentUser = () =>
  fetch(`${MOVIE_TIME_BASE_URL}/api/currentUser`, {
    credentials: "include"
  }).then(response => {
    if (response.status === 401) {
      alert("You are not authorized.");
      return null;
    } else {
      return response.json()
    }
  });

export const getAllUsers = () =>
  fetch(USER_API_URL)
    .then(response => response.json());

export const findUserById = (uid) =>
  fetch(`${USER_API_URL}/${uid}`)
    .then(response => response.json());

export const updateUser = (uid, user) =>
  fetch(`${USER_API_URL}/${uid}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  });

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
    credentials: "include",
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  });

export const unfollowUser = (uid, criticId) =>
  fetch(`${USER_API_URL}/${uid}/follows/${criticId}`, {
    method: "DELETE",
    credentials: "include",
  });


//get user's favorite movies
export const getFavoriteMoviesForUser = (uid) =>
  fetch(`${USER_API_URL}/${uid}/favorites`)
    .then(response => response.json());

//get user's liked reviews
export const getLikedReviewsForUser = (uid) =>
  fetch(`${USER_API_URL}/${uid}/likedReviews`)
    .then(response => response.json());

export const findFollowedCriticsReviews = (uid) =>
  fetch(`${USER_API_URL}/${uid}/followedCriticsReviews`)
    .then(response => {
      return response.json()
    });


export default {
  findUserById,
  register,
  login,
  logout,
  getCurrentUser,
  getAllUsers,
  updateUser,
  findAllFollowsByUserId,
  findAllFollowersByUserId,
  followUser,
  unfollowUser,
  getFavoriteMoviesForUser,
  getLikedReviewsForUser,
  findFollowedCriticsReviews
}
