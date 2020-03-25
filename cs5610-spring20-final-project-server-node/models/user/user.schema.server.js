const mongoose = require('mongoose');

module.exports = function() {
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
      role: String,
      avatarURL: String,
      ratingAndCommentsOrReviews: [
        {
          type: mongoose.Schema.Types.ObjectId, ref: 'ReviewOrCommentModel'
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
          type: mongoose.Schema.Types.ObjectId, ref: 'ReviewOrCommentModel'
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
};