const userDao = require('../data/daos/user.dao.server');
const RCRDao = require('../data/daos/rating-comment-review.dao.server');

module.exports = function (app) {

    // get all
    app.get('/api/posts', (req, res) => {
        RCRDao.findAllRatingAndCommentOrReviews()
            .then(posts => res.json(posts))
    });

    /* ========= REVIEWS ======== */
    // get reviews of a movie
    app.get('/api/movies/:mid/reviews', (req, res) => {
        const tmdbId = req.params['mid'];
        RCRDao.findAllRatingAndCommentOrReviewsForMovie(tmdbId)
            .then(reviews => res.json(reviews))
    });

    // create a new review
    app.post('/api/movies/:mid/reviews', (req, res) => {
        const tmdbId = req.params['mid'];
        RCRDao.createRatingAndCommentOrReview(req.body)
            .then(review => {
                if (review) {
                    userDao.updateUserRatingAndCommentOrReview(review.userId, review._id)
                    res.json(review)
                }
            })
    });

    // TODO: DELETE a review
    // TODO: like/dislike a review

    /* ========= COMMENTS ======== */
    // get comments of a movie
    app.get('/api/movies/:mid/comments', (req, res) => {
        const tmdbId = req.params['mid'];
        RCRDao.findAllRatingAndCommentOrReviewsForMovie(tmdbId)
            .then(comments => res.json(comments))
    });

    // create a new comment
    app.post('/api/movies/:mid/comments', (req, res) => {
        const tmdbId = req.params['mid'];
        RCRDao.createRatingAndCommentOrReview(req.body)
            .then(comment => {
                if (comment) {
                    userDao.updateUserRatingAndCommentOrReview(comment.userId, comment._id)
                    res.json(comment)
                }
            })
    });

    // TODO: DELETE a comment
}
