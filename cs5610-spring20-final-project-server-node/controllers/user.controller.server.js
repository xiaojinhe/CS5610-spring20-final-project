const userDao = require('../data/daos/user.dao.server');
const RCRDao = require('../data/daos/rating-comment-review.dao.server');

module.exports = function (app) {

    /* ========= USERS ======== */
    app.get('/api/users', (req, res) => {
        userDao.findAllUsers()
            .then(users => res.json(users))
    });

    // get a user by id
    app.get('/api/users/:uid', (req, res) => {
        const uid = req.params['uid'];
        userDao.findUserById(uid)
            .then(user => res.json(user))
    });

    // create a new user
    // TODO: use '/api/register' ?
    app.post('/api/users', (req, res) => {
        userDao.createUser(req.body)
            .then((user) => {
                      if (user) {
                          // req.login(user)
                          res.json(user)
                      }
                  }
            )
    })

    // update
    app.put('/api/users/:uid', (req, res) => {
        const uid = req.params['uid'];
        userDao.updateUser(uid, req.body)
            .then(user => res.json(user))
    })

    /* ========= FOLLOWS ======== */
    // get all follows
    app.get('/api/users/:uid/follows', (req, res) => {
        const uid = req.params['uid'];
        userDao.findAllFollowsForUser(uid)
            .then(follows => res.json(follows))
    })

    // get all fans
    app.get('/api/users/:uid/fans', (req, res) => {
        const uid = req.params['uid'];
        userDao.findAllFansForUser(uid)
            .then(followers => res.json(followers))
    })

    // follow
    app.post('/api/users/:uid/follows', (req, res) => {
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

        // TODO: check both user exist
        userDao.updateUserFollows(user1Info.userId, user2Info)
            .then(user => {
                if (user) {
                    userDao.updateUserFollowedBy(user2Info.userId, user1Info)
                }
            })

    })

    // unfollow
    app.delete('/api/users/:uid/follows', (req, res) => {
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

        // TODO: check both user exist
        userDao.deleteUserFollows(user1Info.userId, user2Info)
            .then(user => {
                if (user) {
                    userDao.deleteUserFollowedBy(user2Info.userId, user1Info)
                }
            })
    })

    /* ========= FAVORITES ======== */
    // get all favorites
    app.get('/api/users/:uid/favorites', (req, res) => {
        const uid = req.params['uid'];
        userDao.findAllFavoriteMoviesForUser(uid)
            .then(favorites => res.json(favorites))
    })

    // add a favorite
    // TODO: API Design and how to get uid
    app.post('/api/movies/:mid/favorites', (req, res) => {
        const user = req.session['currentUser'];
        const uid = user._id;
        userDao.updateUserFavoriteMovie(uid, req.body)
            .then(movie => res.json(movie))

    })

    // TODO: remove a favorite
    app.delete('/api/movies/:mid/favorites', (req, res) => {
        const user = req.session['currentUser'];
        const uid = user._id;
        userDao.deleteUserFavoriteMovie(uid, req.body)
            .then(movie => res.json(movie))

    })

    /* ========= RATINGS AND COMMENTS/REVIEWS ======== */
    // get comments of the regular user
    app.get('/api/users/:uid/comments', (req, res) => {
        const uid = req.params['uid'];
        RCRDao.findAllRatingAndCommentOrReviewsForUser(uid)
            .then(comments => res.json(comments))
    })

    // get reviews of the critic
    app.get('/api/users/:uid/reviews', (req, res) => {
        const uid = req.params['uid'];
        RCRDao.findAllRatingAndCommentOrReviewsForUser(uid)
            .then(reviews => res.json(reviews))
    })

    /* ========= LIKED REVIEWS ======== */
    // get likedReviews
    app.get('/api/users/:uid/likedReviews', (req, res) => {
        const uid = req.params['uid'];
        userDao.findAllLikedReviewsForUser(uid)
            .then(likedReviews => res.json(likedReviews))
    })

}
