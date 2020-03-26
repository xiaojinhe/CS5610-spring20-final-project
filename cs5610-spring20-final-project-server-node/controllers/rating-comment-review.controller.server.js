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
        const rid = req.params['rid'];
        RCRDao.deleteRatingAndCommentOrReview(rid)
            .then(review => {
                if (review) {
                    userDao.deleteUserRatingAndCommentOrReview(review.userId, review._id)
                    res.json(review)
                }
            })
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
        const cid = req.params['cid'];
        RCRDao.deleteRatingAndCommentOrReview(cid)
            .then(comment => {
                if (comment) {
                    userDao.deleteUserRatingAndCommentOrReview(comment.userId, comment._id)
                    res.json(comment)
                }
            })
    }
}
