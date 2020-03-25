const mongoose = require('mongoose');
const ratingAndCommentAndReviewSchema = require('./ratingAndCommentOrReview.schema.server');

const ratingAndCommentOrReviewModel = mongoose.model('RatingAndCommentOrReviewModel', ratingAndCommentAndReviewSchema);

findRatingAndCommentOrReviewById = (id) => {
  return ratingAndCommentOrReviewModel.findById(id);
};

findAllRatingAndCommentOrReviews = () => {
  return ratingAndCommentOrReviewModel.find();
};

createRatingAndCommentOrReview = (record) => {
  return ratingAndCommentOrReviewModel.create(record);
};

updateRatingAndCommentOrReview = (id, title, rating, content) => {
  return ratingAndCommentOrReviewModel
    .update({_id: id}, {$set: {title: title, rating: rating, content: content}});
};

//TODO: need to use middleware to remove record in user model
deleteRatingAndCommentOrReview = (id) => {
  return ratingAndCommentOrReviewModel.deleteOne({_id: id});
};

updateLikes = (id, likes) => {
  return ratingAndCommentOrReviewModel.update({_id: id}, {$set: {likes: likes}});
};

updateDislikes = (id, dislikes) => {
  return ratingAndCommentOrReviewModel.update({_id: id}, {$set: {dislikes: dislikes}});
};

findAllRatingAndCommentOrReviewsForMovie = (tmdbId) => {
  return ratingAndCommentOrReviewModel.find({tmdbId: tmdbId});
};

findAllRatingAndCommentOrReviewsForUser = (userId) => {
  return ratingAndCommentOrReviewModel.find({userId: userId});
};

module.exports = {
  findRatingAndCommentOrReviewById,
  findAllRatingAndCommentOrReviews,
  createRatingAndCommentOrReview,
  updateRatingAndCommentOrReview,
  deleteRatingAndCommentOrReview,
  updateLikes,
  updateDislikes,
  findAllRatingAndCommentOrReviewsForMovie,
  findAllRatingAndCommentOrReviewsForUser
};



