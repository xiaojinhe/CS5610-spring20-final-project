const userModel = require('../models/user/user.model.server');

findUserByCredentials = (credentials) => {
  return userModel.findOne(credentials)
    .populate('ratingAndCommentsOrReviews')
    .populate('likedReviews')
    .exec();
};

findUserById = (userId) => {
  return userModel.findById(userId)
    .populate('ratingAndCommentsOrReviews')
    .populate('likedReviews')
    .exec();
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
  return userModel.findOne({username: username})
    .populate('ratingAndCommentsOrReviews')
    .populate('likedReviews')
    .exec();
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
  return userModel.find({_id: userId}, {favoriteMovies: 1});
};

updateUserFavoriteMovie = (userId, movie) => {
  return userModel.update({_id: userId}, {$push: {favoriteMovies: movie}});
};

deleteUserFavoriteMovie = (userId, mid) => {
  return userModel.update({_id: userId}, {$pull: {favoriteMovies: { id: mid}}});
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

deleteLikedReviewById = (reviewId) => {
  return userModel.deleteMany({likedReviews: reviewId});
};

findAllFollowsForUser = (userId) =>{
  return userModel.findOne({_id: userId}, 'follows')
};

updateUserFollows = (userId, userInfo) => {
  return userModel.update({_id: userId}, {$push: {follows: userInfo}});
};

deleteUserFollows = (userId, criticId) => {
  return userModel.update({_id: userId}, {$pull: {follows: {userId: criticId}}});
};

findAllFansForUser = (userId) =>{
  return userModel.findOne({_id: userId}, 'followedBy')
};

updateUserFollowedBy = (userId, userInfo) => {
  return userModel.update({_id: userId}, {$push: {followedBy: userInfo}});
};

deleteUserFollowedBy = (userId, fanId) => {
  return userModel.update({_id: userId}, {$pull: {followedBy: {userId: fanId}}});
};

updateAvatarURLInFollows = (userId, avatarURL) => {
  return userModel.updateMany({ "followedBy.userId": userId},
                          {$set: { "followedBy.$.avatarURL" : avatarURL }});
};

updateAvatarURLInFans = (userId, avatarURL) => {
  return userModel.updateMany({ "follows.userId": userId},
                          {$set: { "follows.$.avatarURL" : avatarURL }});
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
  deleteLikedReviewById,
  findAllFollowsForUser,
  updateUserFollows,
  deleteUserFollows,
  findAllFansForUser,
  updateUserFollowedBy,
  deleteUserFollowedBy,
  updateAvatarURLInFollows,
  updateAvatarURLInFans
};






