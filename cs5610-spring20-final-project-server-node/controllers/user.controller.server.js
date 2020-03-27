const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userDao = require('../data/daos/user.dao.server');
const RCRDao = require('../data/daos/rating-comment-review.dao.server');

module.exports = function (app) {

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userDao.findUserByCredentials({username: username, password: password})
            .then((user) => user ? done(null, user) : done(null, false),
                  (err) => {
                      if (err) {
                          return done(err)
                      }
                  }
            )
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userDao.findUserById(user._id)
            .then((user) => done(null, user),
                  (err) => done(err, null)
            )
    }

    /* ========= USERS ======== */
    app.post('/api/register', register);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.get('/api/currentUser', authorized, getCurrentUser);

    app.get('/api/users', getAllUsers);
    app.get('/api/users/:uid', getUserById);
    app.put('/api/users/:uid', authorized, updateUser);

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
                          res.status(400).send("User already exists");
                      } else {
                          return userDao.createUser(newUser);
                      }
                  }
            )
            .then((user) => {
                      if (user) {
                          // login after register
                          req.login(user, (err) => {
                              if (err) {
                                  res.status(400).send(err);
                              } else {
                                  res.json(user)
                              }
                          });
                      }
                  }
            )
    }

    function login(req, res) {
        res.json(req.user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function getCurrentUser(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function updateUser(req, res) {
        const uid = req.params['uid'];
        userDao.updateUser(uid, req.body)
            .then(result => res.json(result))
    }

    /* ========= FOLLOWS ======== */
    app.get('/api/users/:uid/follows', getAllFollows);
    app.get('/api/users/:uid/fans', getAllFans);
    app.post('/api/users/:uid/follows', authorized, follow);
    app.delete('/api/users/:uid/follows/:criticId', authorized, unFollow);

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
        const user1 = req.user
        const user1Info = {
            userId: user1._id,
            username: user1.username
        }

        const user2Info = {
            userId: req.body['_id'],
            username: req.body['username']
        }

        // check if already followed
        let u = user1.follows.find(user => user.userId === user2Info.userId)
        if (u) {
            return res.sendStatus(200);
        }

        userDao.updateUserFollows(user1Info.userId, user2Info)
            .then(result => {
                if (result.nModified === 1) {
                    userDao.updateUserFollowedBy(user2Info.userId, user1Info)
                        .then(result => {
                            if(result.nModified === 1){
                                res.sendStatus(200);
                            }else{
                                res.status(500).send("updateUserFollowedBy failed");
                            }
                        })
                } else {
                    res.status(500).send("updateUserFollows failed");
                }
            })
    }

    function unFollow(req, res) {
        const user1 = req.user;
        const user1Id = user1._id;
        const user2Id = req.params['criticId'];

        // check if followed, if not, return
        let u = user1.follows.find(user => user.userId === user2Id)
        if (!u) {
            return res.sendStatus(200);
        }

        userDao.deleteUserFollows(user1Id, user2Id)
            .then(result => {
                userDao.deleteUserFollowedBy(user2Id, user1Id)
                    .then(result1 => res.sendStatus(200))
            })
    }

    /* ========= FAVORITES ======== */
    app.get('/api/users/:uid/favorites', getAllFavorites);
    app.post('/api/movies/:mid/favorites', authorized, addFavorite);
    app.delete('/api/movies/:mid/favorites', authorized, removeFavorite);

    function getAllFavorites(req, res) {
        const uid = req.params['uid'];
        userDao.findAllFavoriteMoviesForUser(uid)
            .then(favorites => res.json(favorites))
    }

    function addFavorite(req, res) {
        const user = req.user;
        const uid = user._id;
        const movie = {
            tmdbId: req.body['tmdbId'],
            movieName: req.body['movieName'],
            moviePosterURL: req.body['moviePosterURL'],
            rating: req.body['rating']
        }

        // check if in favorite list
        let m = user.favoriteMovies.find(m => m.tmdbId === movie.tmdbId)
        if (m) {
            return res.sendStatus(200);
        }

        userDao.updateUserFavoriteMovie(uid, movie)
            .then((result) => {
                if (result.nModified === 1) {
                    res.sendStatus(200)
                } else {
                    res.status(500).send("updateUserFavoriteMovie failed");
                }
            })
    }

    function removeFavorite(req, res) {
        const user = req.user;
        const uid = user._id;
        const mid = req.params['mid']

        // check if in favorite list
        let m = user.favoriteMovies.find(m => m.tmdbId === mid)
        if (!m) {
            return res.sendStatus(200);
        }
        userDao.deleteUserFavoriteMovie(uid, mid)
            .then((result) => res.sendStatus(200))
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
