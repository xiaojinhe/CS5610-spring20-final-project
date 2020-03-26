const userDao = require('../data/daos/user.dao.server');
const RCRDao = require('../data/daos/rating-comment-review.dao.server');

module.exports = function (app) {

    // get all
    app.get('/api/posts', (req, res) => {
        RCRDao.findAllRatingAndCommentOrReviews()
            .then(posts => res.json(posts))
    });

    /* ========= REVIEWS ======== */
    app.get('/api/movies/:mid/reviews', findReviewsForMovie);
    app.post('/api/movies/:mid/reviews', createReview);
    app.delete('/api/reviews/:rid', deleteReview);
    // TODO: like/dislike a review
    app.post('/api/reviews/:rid/likes', likeReview);
    app.delete('/api/reviews/:rid/likes', unlikeReview);
    app.post('/api/reviews/:rid/dislikes', dislikeReview);
    app.delete('/api/reviews/:rid/dislikes', unDislikeReview);

    function findReviewsForMovie(req, res) {
        const tmdbId = req.params['mid'];
        RCRDao.findAllRatingAndCommentOrReviewsForMovie(tmdbId)
            .then(reviews => res.json(reviews))
    }

    function createReview(req, res) {
        const tmdbId = req.params['mid'];
        RCRDao.createRatingAndCommentOrReview(req.body)
            .then(review => {
                if (review) {
                    userDao.updateUserRatingAndCommentOrReview(review.userId, review._id)
                    res.json(review)
                }
            })
    }

    function deleteReview(req, res) {
        // TODO: get current user id
        const uid = req.session['uid'];
        const rid = req.params['rid'];
        RCRDao.deleteRatingAndCommentOrReview(rid)
            .then(result => {
                if (result === 1) {
                    // delete from author review list
                    userDao.deleteUserRatingAndCommentOrReview(uid, rid);
                    // delete from liked list
                    userDao.deleteLikedReviewById(rid);
                    res.sendStatus(200)
                }
            })
    }

    function likeReview(req, res) {

    }

    function unlikeReview(req, res) {

    }

    function dislikeReview(req, res) {

    }

    function unDislikeReview(req, res) {

    }

    /* ========= COMMENTS ======== */
    app.get('/api/movies/:mid/comments', findCommentsForMovie);
    app.post('/api/movies/:mid/comments', createComment);
    app.delete('/api/comments/:cid', deleteComment);

    function findCommentsForMovie(req, res) {
        const tmdbId = req.params['mid'];
        RCRDao.findAllRatingAndCommentOrReviewsForMovie(tmdbId)
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
        const uid = req.session['uid'];
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
