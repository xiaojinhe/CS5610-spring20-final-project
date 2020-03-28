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

addLikes = (id) => {
  return ratingAndCommentOrReviewModel.update({_id: id}, {$inc: {likes: 1}});
};

removeLikes = (id) => {
  return ratingAndCommentOrReviewModel.update({_id: id}, {$inc: {likes: -1}});
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

findRatingAndCommentOrReviewByUserAndMovie = (userId, tmdbId) => {
  return ratingAndCommentOrReviewModel.findOne({userId: userId, tmdbId: tmdbId});
}

findTopTenLikedReviews = () => {
  return ratingAndCommentOrReviewModel.find({type: 'REVIEW'}).sort({likes: -1}).limit(10);
};

module.exports = {
  findRatingAndCommentOrReviewById,
  findAllRatingAndCommentOrReviews,
  createRatingAndCommentOrReview,
  updateRatingAndCommentOrReview,
  deleteRatingAndCommentOrReview,
  addLikes,
  removeLikes,
  findAllRatingAndCommentOrReviewsForMovie,
  findAllRatingAndCommentOrReviewsForMovieSortedByDate,
  findAllReviewsForMovieSortedByDate,
  findAllReviewsForMovieSortedByLikes,
  findAllCommentsForMovieSortedByDate,
  findAllRatingAndCommentOrReviewsForUser,
  findRatingAndCommentOrReviewByUserAndMovie,
  findTopTenLikedReviews
};



