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

findAllRatingAndCommentOrReviewsForMovieSortedByDate = (tmdbId) => {
  return ratingAndCommentOrReviewModel.find({tmdbId: tmdbId}).sort({date: -1});
};

findAllReviewsForMovieSortedByDate = (tmdbId) => {
  return ratingAndCommentOrReviewModel.find({tmdbId: tmdbId, type: 'REVIEW'}).sort({date: -1});
};

findAllReviewsForMovieSortedByLikes = (tmdbId) => {
  return ratingAndCommentOrReviewModel.find({tmdbId: tmdbId, type: 'REVIEW'}).sort({likes: -1});
};

findAllCommentsForMovieSortedByDate = (tmdbId) => {
  return ratingAndCommentOrReviewModel.find({tmdbId: tmdbId, type: 'COMMENT'}).sort({date: -1});
};

findAllRatingAndCommentOrReviewsForUser = (userId) => {
  return ratingAndCommentOrReviewModel.find({userId: userId}).sort({date: -1});
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
  findAllRatingAndCommentOrReviewsForMovieSortedByDate,
  findAllReviewsForMovieSortedByDate,
  findAllReviewsForMovieSortedByLikes,
  findAllCommentsForMovieSortedByDate,
  findAllRatingAndCommentOrReviewsForUser
};



