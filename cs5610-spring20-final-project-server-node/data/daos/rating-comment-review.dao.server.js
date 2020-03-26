const ratingAndCommentOrReviewModel = require('../models/rating-comment-review/rating-comment-review.model.server');

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

//TODO: need to use middleware to remove record in user model in the server side
deleteRatingAndCommentOrReview = (id) => {
  return ratingAndCommentOrReviewModel.remove({_id: id});
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

findAllReviewsForMovie = (tmdbId) => {
  return ratingAndCommentOrReviewModel.find({tmdbId: tmdbId, type: 'REVIEW'});
};

findAllCommentsForMovie = (tmdbId) => {
  return ratingAndCommentOrReviewModel.find({tmdbId: tmdbId, type: 'COMMENT'});
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
  findAllReviewsForMovie,
  findAllCommentsForMovie,
  findAllRatingAndCommentOrReviewsForUser
};



