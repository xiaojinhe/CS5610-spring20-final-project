const mongoose = require('mongoose');

module.exports = function() {
  const reviewOrCommentSchema = mongoose.Schema(
    {
      tmdbId: String,
      movieName: String,
      moviePosterURL: String,
      rating: Number,
      userId: String,
      username: String,
      type: String,
      content: String,
      likes: Number,
      dislike: Number
    }, {collection: 'reviews-comments'});
};
