require('./db')();
const mongoose = require('mongoose');

const userDao = require('./daos/user.dao.server');
userDao.findAllUsers().then(users => console.log(users));
userDao.findAllFavoriteMoviesForUser('5e7ad2ba396cf661b0963cf1').then(movies => console.log(movies));

// userDao.createUser({username: "alice", password: "123", email: "alice@gmail.com", role: "CRITIC",
//                    ratingAndCommentsOrReviews: ["5e7acfac5a49b8b4733d4a49"],
//                    favoriteMovies: [{tmdbId: "1", movieName: "lalala", rating: 9.0}]});

const reviewDao = require('./daos/rating-comment-review.dao.server');
// reviewDao.deleteRatingAndCommentOrReview('5e7ad458146d6961c47ed2fa').then(res => console.log(res));
// reviewDao.findAllRatingAndCommentOrReviews().then(records => console.log(records));
// reviewDao.updateLikes("5e7ad1325a49b8b4733d4a4a", 10).then(status => console.log(status));
reviewDao.findAllReviewsForMovieSortedByLikes("2").then(records => console.log(records));
