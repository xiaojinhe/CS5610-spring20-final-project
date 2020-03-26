const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    google: {
      id: String,
      token: String
    },
    facebook: {
      id: String,
      token: String
    },
    phone: String,
    email: String,
    role: {
      type: String,
      enum: [
        'REGULAR',
        'CRITIC'
      ]
    },
    avatarURL: String,
    ratingAndCommentsOrReviews: [
      {
        type: mongoose.Schema.Types.ObjectId, ref: 'RatingAndCommentOrReviewModel'
      }
    ],
    favoriteMovies: [
      {
        tmdbId: String,
        movieName: String,
        moviePosterURL: String,
        rating: Number
      }
    ],
    likedReviews: [
      {
        type: mongoose.Schema.Types.ObjectId, ref: 'RatingAndCommentOrReviewModel'
      }
    ],
    follows: [
      {
        userId: String,
        username: String
      }
    ],
    followedBy: [
      {
        userId: String,
        username: String
      }
    ]
  }, {collection: 'users'});

module.exports = userSchema;
