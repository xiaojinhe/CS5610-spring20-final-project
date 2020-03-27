const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userDao = require('../data/daos/user.dao.server');
const RCRDao = require('../data/daos/rating-comment-review.dao.server');

module.exports = function (app) {

    /* ========= USERS ======== */
    app.get('/api/users', getAllUsers);
    app.get('/api/users/:uid', getUserById);
    app.post('/api/register', register);
    app.put('/api/users/:uid', updateUser);

    function getAllUsers(req, res) {
        userDao.findAllUsers()
            .then(users => res.json(users))
    }

    function getUserById(req, res) {
        const uid = req.params['uid'];
        userDao.findUserById(uid)
            .then(user => res.json(user))
    }

    function register(req, res) {
        const newUser = req.body;
        // first check if the username has been used
        userDao.findByUsername(newUser.username)
            .then((user) => {
                      if (user) {
                          // TODO: what if username exist
                          res.sendStatus(400)
                      } else {
                          userDao.createUser(newUser);
                      }
                  }
            )
            .then((user) => {
                      if (user) {
                          // login after register
                          req.login(user, (err) => {
                              if(err){
                                  res.status(400).send(err);
                              }else{
                                  res.json(user)
                              }
                          });
                      }
                  }
            )
    }

    function updateUser(req, res) {
        const uid = req.params['uid'];
        userDao.updateUser(uid, req.body)
            .then(result => res.json(result))
    }

    /* ========= FOLLOWS ======== */
    app.get('/api/users/:uid/follows', getAllFollows);
    app.get('/api/users/:uid/fans', getAllFans);
    app.post('/api/users/:uid/follows', follow);
    app.delete('/api/users/:uid/follows', unFollow);

    function getAllFollows(req, res) {
        const uid = req.params['uid'];
        userDao.findAllFollowsForUser(uid)
            .then(follows => res.json(follows))
    }

    function getAllFans(req, res) {
        const uid = req.params['uid'];
        userDao.findAllFansForUser(uid)
            .then(followers => res.json(followers))
    }

    function follow(req, res) {
        // TODO: Get logged in user
        const user1 = req.session['currentUser']
        const user1Info = {
            userId: user1._id,
            username: user1.username
        }

        const user2Info = {
            userId: req.body['_id'],
            username: req.body['username']
        }

        userDao.updateUserFollows(user1Info.userId, user2Info)
            .then(result => {
                if (result) {
                    userDao.updateUserFollowedBy(user2Info.userId, user1Info)
                        .then(result => res.sendStatus(result ? 200 : 404))
                } else {
                    res.sendStatus(404);
                }
            })
    }

    function unFollow(req, res) {
        // TODO: Get logged in user
        const user1 = req.session['currentUser']
        const user1Info = {
            userId: user1._id,
            username: user1.username
        }

        const user2Info = {
            userId: req.body['_id'],
            username: req.body['username']
        }

        userDao.deleteUserFollows(user1Info.userId, user2Info)
            .then(result => {
                if (result.n === 1) {
                    userDao.deleteUserFollowedBy(user2Info.userId, user1Info)
                        .then(result2 => res.sendStatus(result2 === 1 ? 200 : 404))
                } else {
                    res.sendStatus(404);
                }
            })
    }

    /* ========= FAVORITES ======== */
    app.get('/api/users/:uid/favorites', getAllFavorites);
    app.post('/api/movies/:mid/favorites', addFavorite);
    app.delete('/api/movies/:mid/favorites', removeFavorite);

    function getAllFavorites(req, res) {
        const uid = req.params['uid'];
        userDao.findAllFavoriteMoviesForUser(uid)
            .then(favorites => res.json(favorites))
    }

    function addFavorite(req, res) {
        // TODO: get uid for logged in user
        // const user = req.session['currentUser'];
        // const uid = user._id;
        const uid = req.body['uid'];
        const movie = {
            tmdbId: req.body['tmdbId'],
            movieName: req.body['movieName'],
            moviePosterURL: req.body['moviePosterURL'],
            rating: req.body['rating']
        }
        userDao.updateUserFavoriteMovie(uid, movie)
            .then((result) => res.json(result))
    }

    function removeFavorite(req, res) {
        // TODO: get uid for logged in user
        const user = req.session['currentUser'];
        const uid = user._id;
        userDao.deleteUserFavoriteMovie(uid, req.body)
            .then((result) => res.json(result))
    }

    /* ========= RATINGS AND COMMENTS/REVIEWS ======== */
    app.get('/api/users/:uid/comments', findCommentsForRegularUser)
    app.get('/api/users/:uid/reviews', findReviewsForCritic)

    function findCommentsForRegularUser(req, res) {
        const uid = req.params['uid'];
        RCRDao.findAllRatingAndCommentOrReviewsForUser(uid)
            .then(comments => res.json(comments))
    }

    function findReviewsForCritic(req, res) {
        const uid = req.params['uid'];
        RCRDao.findAllRatingAndCommentOrReviewsForUser(uid)
            .then(reviews => res.json(reviews))
    }

    /* ========= LIKED REVIEWS ======== */
    app.get('/api/users/:uid/likedReviews', findLikedReviewsForUser)

    function findLikedReviewsForUser(req, res) {
        const uid = req.params['uid'];
        userDao.findAllLikedReviewsForUser(uid)
            .then(likedReviews => res.json(likedReviews))
    }

}
