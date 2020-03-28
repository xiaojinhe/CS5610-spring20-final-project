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
    app.get('/api/reviews/:rid', findReviewById);
    app.post('/api/movies/:mid/reviews', authorized, createReview);
    app.put('/api/reviews/:rid', authorized, updateReview);
    app.delete('/api/reviews/:rid', authorized, deleteReview);
    app.post('/api/reviews/:rid/likes', authorized, likeReview);
    app.delete('/api/reviews/:rid/likes', authorized, unlikeReview);
    app.get('/api/mostLikedReviews', findMostLikedReviews);

    function findReviewsForMovie(req, res) {
        const tmdbId = req.params['mid'];
        RCRDao.findAllReviewsForMovieSortedByLikes(tmdbId)
            .then(reviews => res.json(reviews))
    }

    function findReviewById(req, res) {
        const rid = req.params["rid"];
        RCRDao.findRatingAndCommentOrReviewById(rid)
            .then(review => res.json(review))
    }

    function createReview(req, res) {
        const user = req.user;
        const review = req.body;
        review.userId = user._id;
        review.username = user.username;

        RCRDao.createRatingAndCommentOrReview(review)
            .then(review => {
                if (review) {
                    userDao.updateUserRatingAndCommentOrReview(user._id, review._id)
                    res.json(review)
                }
            })
    }

    function updateReview(req, res) {
        const rid = req.params['rid'];
        const title = req.body['title'];
        const rating = req.body['rating'];
        const content = req.body['content'];
        RCRDao.updateRatingAndCommentOrReview(rid, title, rating, content)
            .then(result => res.json(result))
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

    function findMostLikedReviews(req, res) {
        RCRDao.findTopTenLikedReviews()
            .then(reviews => res.json(reviews))
    }

    /* ========= COMMENTS ======== */
    app.get('/api/movies/:mid/comments', findCommentsForMovie);
    app.post('/api/movies/:mid/comments', authorized, createComment);
    app.put('/api/comments/:cid', authorized, updateComment);
    app.delete('/api/comments/:cid', authorized, deleteComment);

    function findCommentsForMovie(req, res) {
        const tmdbId = req.params['mid'];
        RCRDao.findAllCommentsForMovieSortedByDate(tmdbId)
            .then(comments => res.json(comments))
    }

    function createComment(req, res) {
        const user = req.user;
        const comment = req.body;
        comment.userId = user._id;
        comment.username = user.username;

        RCRDao.createRatingAndCommentOrReview(comment)
            .then(comment => {
                if (comment) {
                    userDao.updateUserRatingAndCommentOrReview(user._id, comment._id)
                    res.json(comment)
                }
            })
    }

    function updateComment(req, res) {
        const cid = req.params['cid'];
        const title = req.body['title'];
        const rating = req.body['rating'];
        const content = req.body['content'];
        RCRDao.updateRatingAndCommentOrReview(cid, title, rating, content)
            .then(result => res.json(result))
    }

    function deleteComment(req, res) {
        const user = req.user;
        const uid = user._id;
        const cid = req.params['cid'];
        RCRDao.deleteRatingAndCommentOrReview(cid)
            .then(result => {
                if (result.deletedCount === 1) {
                    // delete from author comment list
                    userDao.deleteUserRatingAndCommentOrReview(uid, cid);
                }
                res.sendStatus(200)
            })
    }
}
