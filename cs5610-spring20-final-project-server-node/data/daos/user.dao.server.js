const userModel = require('../models/user/user.model.server');

findUserByCredentials = (credentials) => {
  return userModel.findOne(credentials);
};

findUserById = (userId) => {
  return userModel.findById(userId);
};

findAllUsers = () => {
  return userModel.find();
};

createUser = (user) => {
  return userModel.create(user);
};

updateUser = (userId, user) => {
  return userModel.updateOne({_id: userId}, user);
};

findByUsername = (username) => {
  return userModel.findOne({username: username});
};

updateUserPhone = (userId, phone) => {
  return userModel.update({_id: userId}, {$set: {phone: phone}});
};

updateUserEmail = (userId, email) => {
  return userModel.update({_id: userId}, {$set: {email: email}});
};

updateUserAvatarURL = (userId, avatarURL) => {
  return userModel.update({_id: userId}, {$set: {avatarURL: avatarURL}});
};

findAllRatingAndCommentsOrReviewsForUser = (userId) => {
  return userModel
    .findOne({_id: userId}, {ratingAndCommentsOrReviews: 1})
    .populate('ratingAndCommentsOrReviews')
    .exec();
};

updateUserRatingAndCommentOrReview = (userId, reviewOrCommentId) => {
  return userModel.update({_id: userId}, {$push: {ratingAndCommentsOrReviews: reviewOrCommentId}})
};

deleteUserRatingAndCommentOrReview = (userId, reviewOrCommentId) => {
  return userModel.update({_id: userId}, {$pull: {ratingAndCommentsOrReviews: reviewOrCommentId}})
};

findAllFavoriteMoviesForUser = (userId) => {
  return userModel.findOne({_id: userId}, {favoriteMovies: 1});
};

updateUserFavoriteMovie = (userId, movie) => {
  return userModel.update({_id: userId}, {$push: {favoriteMovies: movie}});
};

deleteUserFavoriteMovie = (userId, movie) => {
  return userModel.update({_id: userId}, {$pull: {favoriteMovies: movie}});
};

findAllLikedReviewsForUser = (userId) => {
  return userModel
    .findOne({_id: userId}, {likedReviews: 1})
    .populate('likedReviews')
    .exec();
};

updateUserLikedReview = (userId, reviewId) => {
  return userModel.update({_id: userId}, {$push: {likedReviews: reviewId}});
};

deleteUserLikedReview = (userId, reviewId) => {
  return userModel.update({_id: userId}, {$pull: {likedReviews: reviewId}});
};

findAllFollowsForUser = (userId) =>{
  return userModel.find({_id: userId}, 'follows')
}

updateUserFollows = (userId, userInfo) => {
  return userModel.update({_id: userId}, {$push: {follows: userInfo}});
};

deleteUserFollows = (userId, userInfo) => {
  return userModel.update({_id: userId}, {$pull: {follows: userInfo}});
};

findAllFansForUser = (userId) =>{
  return userModel.find({_id: userId}, 'followedBy')
}

updateUserFollowedBy = (userId, userInfo) => {
  return userModel.update({_id: userId}, {$push: {followedBy: userInfo}});
};

deleteUserFollowedBy = (userId, userInfo) => {
  return userModel.update({_id: userId}, {$pull: {followedBy: userInfo}});
};

module.exports = {
  findUserByCredentials,
  findUserById,
  findByUsername,
  findAllUsers,
  createUser,
  updateUser,
  updateUserPhone,
  updateUserEmail,
  updateUserAvatarURL,
  findAllRatingAndCommentsOrReviewsForUser,
  updateUserRatingAndCommentOrReview,
  deleteUserRatingAndCommentOrReview,
  findAllFavoriteMoviesForUser,
  updateUserFavoriteMovie,
  deleteUserFavoriteMovie,
  findAllLikedReviewsForUser,
  updateUserLikedReview,
  deleteUserLikedReview,
  findAllFollowsForUser,
  updateUserFollows,
  deleteUserFollows,
  findAllFansForUser,
  updateUserFollowedBy,
  deleteUserFollowedBy
};






