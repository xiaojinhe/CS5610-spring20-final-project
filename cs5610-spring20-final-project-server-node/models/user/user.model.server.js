const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');

const userModel = mongoose.model('userModel', userSchema);

const findUserByCredentials = (credentials) => {
  return userModel.findOne(credentials);
};

const findUserById = (userId) => {
  return userModel.findById(userId);
};

const findAllUsers = () => {
  return userModel.find();
};

const createUser = (user) => {
  return userModel.create(user);
};

const updateUser = (userId, user) => {
  return userModel.updateOne({_id: userId}, user);
};

const findByUsername = (username) => {
  return userModel.findOne({username: username});
};

const updateUsername = (userId, username) => {
  return userModel.update({_id: userId}, {$set: {username: username}});
};

const updateUserPhone = (userId, phone) => {
  return userModel.update({_id: userId}, {$set: {phone: phone}});
};

const updateUserEmail = (userId, email) => {
  return userModel.update({_id: userId}, {$set: {email: email}});
};

const updateUserAvatarURL = (userId, avatarURL) => {
  return userModel.update({_id: userId}, {$set: {avatarURL: avatarURL}});
};

const findAllRatingAndReviewsOrCommentsForUser = (userId) => {
  return userModel
    .findOne({_id: userId}, {ratingAndCommentsOrReviews: 1})
    .populate('ratingAndCommentsOrReviews')
    .exec();
};

const updateUserRatingAndReviewOrComment = (userId, reviewOrCommentId) => {
  return userModel.update({_id: userId}, {$push: {ratingAndCommentsOrReviews: reviewOrCommentId}})
};

const deleteUserRatingAndReviewOrComment = (userId, reviewOrCommentId) => {
  return userModel.update({_id: userId}, {$pull: {ratingAndCommentsOrReviews: reviewOrCommentId}})
};

const findAllFavoriteMoviesForUser = (userId) => {
  return userModel.findOne({_id: userId}, {favoriteMovies: 1});
};

const updateUserFavoriteMovie = (userId, movie) => {
  return userModel.update({_id: userId}, {$push: {favoriteMovies: movie}});
};

const deleteUserFavoriteMovie = (userId, movie) => {
  return userModel.update({_id: userId}, {$pull: {favoriteMovies: movie}});
};

const findAllLikedReviewsForUser = (userId) => {
  return userModel
    .findOne({_id: userId}, {likedReviews: 1})
    .populate('likedReviews')
    .exec();
};

const updateUserLikedReview = (userId, reviewId) => {
  return userModel.update({_id: userId}, {$push: {likedReviews: reviewId}});
};

const deleteUserLikedReview = (userId, reviewId) => {
  return userModel.update({_id: userId}, {$pull: {likedReviews: reviewId}});
};

const updateUserFollows = (userId, userInfo) => {
  return userModel.update({_id: userId}, {$push: {follows: userInfo}});
};

const deleteUserFollows = (userId, userInfo) => {
  return userModel.update({_id: userId}, {$pull: {follows: userInfo}});
};

const updateUserFollowedBy = (userId, userInfo) => {
  return userModel.update({_id: userId}, {$push: {followedBy: userInfo}});
};

const deleteUserFollowedBy = (userId, userInfo) => {
  return userModel.update({_id: userId}, {$pull: {followedBy: userInfo}});
};

module.exports = {
  findUserByCredentials,
  findUserById,
  findByUsername,
  findAllUsers,
  createUser,
  updateUser,
  updateUsername,
  updateUserPhone,
  updateUserEmail,
  updateUserAvatarURL,
  findAllRatingAndReviewsOrCommentsForUser,
  updateUserRatingAndReviewOrComment,
  deleteUserRatingAndReviewOrComment,
  findAllFavoriteMoviesForUser,
  updateUserFavoriteMovie,
  deleteUserFavoriteMovie,
  findAllLikedReviewsForUser,
  updateUserLikedReview,
  deleteUserLikedReview,
  updateUserFollows,
  deleteUserFollows,
  updateUserFollowedBy,
  deleteUserFollowedBy
};






