const mongoose = require('mongoose');

const ratingAndCommentAndReviewSchema = mongoose.Schema(
  {
      tmdbId: String,
      movieName: String,
      moviePosterURL: String,
      rating: Number,
      userId: String,
      username: String,
      type: {
            type: String,
            enum: [
                  'COMMENT',
                  'REVIEW'
            ]
      },
      title: String,
      content: String,
      likes: Number,
      dislikes: Number
  }, {collection: 'ratings_comments_reviews'});

module.exports = ratingAndCommentAndReviewSchema;
