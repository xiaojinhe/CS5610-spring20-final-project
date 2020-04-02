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
        id: String,
        title: String,
        poster_path: String,
        vote_average: Number,
        release_date: String,
        overview: String
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
        username: String,
        avatarURL: String
      }
    ],
    followedBy: [
      {
        userId: String,
        username: String,
        avatarURL: String
      }
    ]
  }, {collection: 'users'});

module.exports = userSchema;
