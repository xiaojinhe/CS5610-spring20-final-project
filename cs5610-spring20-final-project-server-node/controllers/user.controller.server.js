const userDao = require('../data/models/user.dao.server');
const RCRDao = require('../data/models/ratingAndCommentOrReview.dao.server');

module.exports = function (app) {

    /* ========= USERS ======== */
    // get a user by id
    app.get('/api/users/:uid', (req, res) => {
        const uid = req.params['uid'];
        userDao.findUserById(uid)
            .then(user => res.json(user))
    });

    // create a new user
    app.post('/api/users', (req, res) => {
        userDao.createUser(req.body)
            .then(user => res.json(user))
    })

    // update
    app.put('/api/users/:uid', (req, res) => {
        const uid = req.params['uid'];
        userDao.updateUser(uid, req.body)
            .then(user => res.json(user))
    })

    /* ========= FOLLOWS ======== */
    // TODO: GET all follows/followedBys, do we have separate api for followedBy?
    app.get('/api/users/:uid/follows', (req, res) => {
        const uid = req.params['uid'];

    })

    // follow
    app.post('/api/users/:uid/follows', (req, res) => {
        const user1Id = req.params['uid'];
        userDao.updateUserFollows(user1Id, req.body)
            .then(user => res.json(user))

        // TODO: updateUserFollowedBy
        // const user2Id = req.body['_id']
        // const user2Info = {} ???
        // userDao.updateUserFollowedBy(user2Id, user2Info)
    })

    // unfollow
    app.delete('/api/users/:uid/follows', (req, res) => {
        const user1Id = req.params['uid'];
        userDao.deleteUserFollows(user1Id, req.body)
            .then(user => res.json(user))

        // TODO: deleteUserFollowedBy
        // const user2Id = req.body['_id']
        // const user2Info = {} ???
        // userDao.deleteUserFollowedBy(user2Id, user2Info)
    })

    /* ========= FAVORITES ======== */
    // get all favorites
    app.get('/api/users/:uid/favorites', (req, res) => {
        const uid = req.params['uid'];
        userDao.findAllFavoriteMoviesForUser(uid)
            .then(movies => res.json(movies))
    })

    // TODO: add a favorite
    app.post('/api/users/:uid/favorites', (req, res) => {
        const uid = req.params['uid'];
        userDao.updateUserFavoriteMovie(uid, req.body)
            .then(movie => res.json(movie))

    })

    // TODO: remove a favorite
    app.delete('/api/users/:uid/favorites', (req, res) => {
        const uid = req.params['uid'];
        userDao.deleteUserFavoriteMovie(uid, req.body)
            .then(movie => res.json(movie))

    })

    /* ========= RATINGS AND COMMENTS/REVIEWS ======== */
    // TODO: SAME API?
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
            .then(reviews => res.json(reviews))
    })

    // TODO: user likes or dislikes a review

}
