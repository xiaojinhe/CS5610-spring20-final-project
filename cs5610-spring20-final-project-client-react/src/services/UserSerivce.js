import users from './users.json'

export const findUserById = (uid) =>
  users.find(user => user.uid === uid)

export default {
  findUserById
}