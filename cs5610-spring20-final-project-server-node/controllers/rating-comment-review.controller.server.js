const userDao = require('../data/daos/user.dao.server');
const RCRDao = require('../data/daos/rating-comment-review.dao.server');

module.exports = function (app) {

    // get all
    app.get('/api/posts', (req, res) => {
        RCRDao.findAllRatingAndCommentOrReviews()
            .then(posts => res.json(posts))
    });

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    /* ========= REVIEWS ======== */
    app.get('/api/movies/:mid/reviews', findReviewsForMovie);
    app.post('/api/movies/:mid/reviews', authorized, createReview);
    app.get('/api/reviews/:rid', findReviewById);
    app.delete('/api/reviews/:rid', authorized, deleteReview);
    app.post('/api/reviews/:rid/likes', authorized, likeReview);
    app.delete('/api/reviews/:rid/likes', authorized, unlikeReview);

    function findReviewsForMovie(req, res) {
        const tmdbId = req.params['mid'];
        RCRDao.findAllReviewsForMovieSortedByLikes(tmdbId)
            .then(reviews => res.json(reviews))
    }

    function createReview(req, res) {
        const tmdbId = req.params['mid'];
        const user = req.user;

        // check if already written a review for that movie
        RCRDao.findRatingAndCommentOrReviewByUserAndMovie(user._id, tmdbId)
            .then((review) => {
                if (review) {
                    res.json(review)
                } else {
                    // if not, create review
                    RCRDao.createRatingAndCommentOrReview(req.body)
                        .then(review => {
                            if (review) {
                                userDao.updateUserRatingAndCommentOrReview(user._id, review._id)
                                res.json(review)
                            }
                        })
                }
            })
    }

    function findReviewById(req, res) {
        const rid = req.params["rid"];
        RCRDao.findRatingAndCommentOrReviewById(rid)
            .then(review => res.json(review))
    }

    function deleteReview(req, res) {
        const user = req.user;
        const uid = user._id;
        const rid = req.params['rid'];
        RCRDao.deleteRatingAndCommentOrReview(rid)
            .then(result => {
                if (result.deletedCount === 1) {
                    // delete from author review list
                    userDao.deleteUserRatingAndCommentOrReview(uid, rid);
                    // delete from liked list
                    userDao.deleteLikedReviewById(rid);
                }
                res.sendStatus(200)
            })
    }

    function likeReview(req, res) {
        const user = req.user;
        const uid = user._id;
        const rid = req.params['rid'];

        // check if in likedReview list
        let r = user.likedReviews.find(reviews => ('' + reviews._id) === rid);
        if (r) {
            return res.sendStatus(200);
        }

        userDao.updateUserLikedReview(uid, rid)
            .then((result) => {
                if (result.nModified === 1) {
                    RCRDao.addLikes(rid)
                        .then(result => {
                            if (result.nModified === 1) {
                                res.sendStatus(200);
                            } else {
                                res.status(500).send("addLikes failed")
                            }
                        })
                } else {
                    res.status(500).send("updateUserLikedReview failed")
                }
            })
    }

    function unlikeReview(req, res) {
        const user = req.user;
        const uid = user._id;
        const rid = req.params['rid'];

        // check if in likedReview list
        let r = user.likedReviews.find(reviews => ('' + reviews._id) === rid);
        if (!r) {
            return res.sendStatus(200);
        }

        userDao.deleteUserLikedReview(uid, rid)
            .then((result) => {
                if (result.nModified === 1) {
                    RCRDao.removeLikes(rid)
                        .then(result => {
                            if (result.nModified === 1) {
                                res.sendStatus(200);
                            } else {
                                res.status(500).send("removeLikes failed")
                            }
                        })
                } else {
                    res.status(500).send("deleteUserLikedReview failed")
                }
            })
    }

    /* ========= COMMENTS ======== */
    app.get('/api/movies/:mid/comments', findCommentsForMovie);
    app.post('/api/movies/:mid/comments', createComment);
    app.delete('/api/comments/:cid', deleteComment);

    function findCommentsForMovie(req, res) {
        const tmdbId = req.params['mid'];
        RCRDao.findAllCommentsForMovieSortedByDate(tmdbId)
            .then(comments => res.json(comments))
    }

    function createComment(req, res) {
        RCRDao.createRatingAndCommentOrReview(req.body)
            .then(comment => {
                if (comment) {
                    userDao.updateUserRatingAndCommentOrReview(comment.userId, comment._id)
                    res.json(comment)
                }
            })
    }

    function deleteComment(req, res) {
        // TODO: get current user id
        const uid = req.user._id;
        const cid = req.params['cid'];
        RCRDao.deleteRatingAndCommentOrReview(cid)
            .then(result => {
                if (result === 1) {
                    // delete from author comment list
                    userDao.deleteUserRatingAndCommentOrReview(uid, cid);
                    res.sendStatus(200)
                }
            })
    }
}
