const mongoose = require('mongoose');

module.exports = function() {
  const ratingAndCommentAndReviewSchema = mongoose.Schema(
    {
      tmdbId: String,
      movieName: String,
      moviePosterURL: String,
      rating: Number,
      userId: String,
      username: String,
      type: String,
      title: String,
      content: String,
      likes: Number,
      dislike: Number
    }, {collection: 'ratings-comments-reviews'});
};
