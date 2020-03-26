import users from './users.json'
import {USER_API_URL} from "../common/constants";

//todo: fill in all the request url

export const registerUser = (user) =>
  fetch(USER_API_URL, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

//TODO: replace with login
export const userLogin = (username, password) =>
  users.find(user => user.uid === "1");

export const findUserById = (uid) =>
  fetch(USER_API_URL)
    .then(response => response.json());

export const updateUser = (uid, user) =>
  fetch(`${USER_API_URL}/${uid}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

/* ======== FOLLOWS ======== */

//get all follows
export const findAllFollowsByUserId = (uid) =>
  fetch(`${USER_API_URL}/${uid}/follows`)
    .then(response => response.json());


//get all followers
export const findAllFollowersByUserId = (uid) =>
  fetch(`${USER_API_URL}/${uid}/followers`)
    .then(response => response.json());


/* ======= FAVORITES ========= */
//add movie to favorites

//TODO: change url based on server change
export const addMovieToFavorites = (uid, movie) =>
  fetch("", {
    method: "POST",
    body: JSON.stringify(movie),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const removeMovieFromFavorites = (uid, movie) =>
  fetch(USER_API_URL, {
    method: "DELETE",
    body: JSON.stringify(movie),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());


export default {
  findUserById,
  userLogin,
  registerUser,
  updateUser,
  findAllFollowsByUserId,
  findAllFollowersByUserId,
  addMovieToFavorites,
  removeMovieFromFavorites
}
