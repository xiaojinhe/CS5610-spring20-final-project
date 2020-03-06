import users from './users.json'

export const findUserById = (uid) =>
    users.find(user => user.uid === uid);

export const userLogin = (email, password) =>
  //todo: change to call the service api
//currently just assume the login user is user with with "1"
  users.find(user => user.uid === "1");


export default {
    findUserById,
    userLogin
}