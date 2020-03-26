const userDao = require('../data/daos/user.dao.server');
const RCRDao = require('../data/daos/rating-comment-review.dao.server');

module.exports = function (app) {

    /* ========= USERS ======== */
    app.get('/api/users', getAllUsers);
    app.get('/api/users/:uid', getUserById);
    app.post('/api/users', register);  // TODO: use '/api/register' ?
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
        userDao.createUser(req.body)
            .then((user) => {
                      if (user) {
                          // TODO: login after register
                          // req.login(user)
                          res.json(user)
                      }
                  }
            )
    }

    function updateUser(req, res) {
        const uid = req.params['uid'];
        userDao.updateUser(uid, req.body)
            .then(user => res.json(user))
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
            .then(user => {
                if (user) {
                    userDao.updateUserFollowedBy(user2Info.userId, user1Info)
                        .then(user => res.sendStatus(user ? 200 : 404))
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
            .then(user => {
                if (user) {
                    userDao.deleteUserFollowedBy(user2Info.userId, user1Info)
                        .then(user => res.sendStatus(user ? 200 : 404))
                } else {
                    res.sendStatus(404);
                }
            })
    }

    /* ========= FAVORITES ======== */
    app.get('/api/users/:uid/favorites', getAllFavorites);
    // TODO: how to get uid? use'/api/users/:uid/favorites' ?
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
