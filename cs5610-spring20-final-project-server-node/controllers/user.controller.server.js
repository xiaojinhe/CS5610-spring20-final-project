const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userDao = require('../data/daos/user.dao.server');

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
            .then(user => res.json(user));
    }

    function register(req, res) {
        const newUser = req.body;
        // first check if the username has been used
        userDao.findByUsername(newUser.username)
            .then((user) => {
                      if (user) {
                          // TODO: what if username exist
                          res.status(400).json({error: "User already exists"});
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
                                  res.status(500).json({error: err});
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
        res.json(req.user);
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    async function updateUser(req, res) {
        const currentUser = req.user;
        const uid = req.params['uid'];
        const oldAvatar = currentUser.avatarURL;
        let updateResult = await userDao.updateUser(uid, req.body);
        if (updateResult.n === 1) {
            if (updateResult.nModified === 1) {
                // update avatar
                let newAvatar = req.body.avatarURL;
                if (newAvatar != oldAvatar) {
                    await userDao.updateAvatarURLInFollows(uid, newAvatar);
                    await userDao.updateAvatarURLInFans(uid, newAvatar);
                }
                res.sendStatus(200)
            } else {
                res.status(500).json({error: "updateUser failed"});
            }
        } else {
            res.sendStatus(400)
        }
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
        const user1 = req.user;
        const user1Info = {
            userId: user1._id,
            username: user1.username,
            avatarURL: user1.avatarURL
        };

        const user2Info = {
            userId: req.body['userId'],
            username: req.body['username'],
            avatarURL: req.body['avatarURL']
        };

        // check if already followed
        let u = user1.follows.find(user => user.userId === user2Info.userId);
        if (u) {
            return res.sendStatus(200);
        }

        userDao.updateUserFollows(user1Info.userId, user2Info)
            .then(result => {
                if (result.nModified === 1) {
                    userDao.updateUserFollowedBy(user2Info.userId, user1Info)
                        .then(result => {
                            if (result.nModified === 1) {
                                res.sendStatus(200);
                            } else {
                                res.status(500).json({error: "updateUserFollowedBy failed"});
                            }
                        })
                } else {
                    res.status(500).json({error: "updateUserFollows failed"});
                }
            })
    }

    function unFollow(req, res) {
        const user1 = req.user;
        const user1Id = user1._id;
        const user2Id = req.params['criticId'];

        // check if followed, if not, return
        let u = user1.follows.find(user => user.userId === user2Id);
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
        const movie = req.body;

        // check if in favorite list
        let m = user.favoriteMovies.find(m => m.id === movie.id);
        if (m) {
            return res.sendStatus(200);
        }

        userDao.updateUserFavoriteMovie(uid, movie)
            .then((result) => {
                if (result.nModified === 1) {
                    res.sendStatus(200)
                } else {
                    res.status(500).json({error: "updateUserFavoriteMovie failed"});
                }
            })
    }

    function removeFavorite(req, res) {
        const user = req.user;
        const uid = user._id;
        const mid = req.params['mid'];

        // check if in favorite list
        let m = user.favoriteMovies.find(m => m.id === mid);
        if (!m) {
            return res.sendStatus(200);
        }
        userDao.deleteUserFavoriteMovie(uid, mid)
            .then((result) => res.sendStatus(200))
    }

    /* ========= RATINGS AND COMMENTS/REVIEWS ======== */
    app.get('/api/users/:uid/comments', findCommentsForRegularUser);
    app.get('/api/users/:uid/reviews', findReviewsForCritic);
    app.get('/api/users/:uid/followedCriticsReviews', findFollowedCriticsReviews);

    function findCommentsForRegularUser(req, res) {
        const uid = req.params['uid'];
        userDao.findAllRatingAndCommentOrReviewsForUser(uid)
            .then(comments => res.json(comments))
    }

    function findReviewsForCritic(req, res) {
        const uid = req.params['uid'];
        userDao.findAllRatingAndCommentOrReviewsForUser(uid)
            .then(reviews => res.json(reviews))
    }

    async function findFollowedCriticsReviews(req, res) {
        const uid = req.params['uid'];
        let critics = await userDao.findAllFollowsForUser(uid);
        let results = [];
        for (critic of critics.follows) {
            let reviews = await userDao.findAllRatingAndCommentsOrReviewsForUser(critic.userId);
            if(reviews){
                for (review of reviews.ratingAndCommentsOrReviews) {
                    results.push(review);
                }
            }
        }
        return res.json(results);
    }

    /* ========= LIKED REVIEWS ======== */
    app.get('/api/users/:uid/likedReviews', findLikedReviewsForUser);

    function findLikedReviewsForUser(req, res) {
        const uid = req.params['uid'];
        userDao.findAllLikedReviewsForUser(uid)
            .then(likedReviews => res.json(likedReviews))
    }

};
