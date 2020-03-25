require('./db')();

const userDao = require('./models/user.dao.server');
userDao.findAllUsers().then(users => console.log(users));

const reviewDao = require('./models/ratingAndCommentOrReview.dao.server');
reviewDao.findAllRatingAndCommentOrReviews().then(records => console.log(records));
