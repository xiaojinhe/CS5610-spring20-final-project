const mongoose = require('mongoose');
const ratingAndCommentOrReviewSchema = require('./rating-comment-review.schema.server');
module.exports = mongoose.model('RatingAndCommentOrReviewModel', ratingAndCommentOrReviewSchema);
