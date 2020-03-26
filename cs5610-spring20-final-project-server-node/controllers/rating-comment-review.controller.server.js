const userDao = require('../data/models/user.dao.server');
const RCRDao = require('../data/models/rating-comment-review.dao.server');

module.exports = function (app) {
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
                // TODO: move code to DAO?
                userDao.updateUserRatingAndCommentOrReview(review.userId, review._id)
                res.json(review)
            })
    });

    /* ========= COMMENTS ======== */
    // get comments of a movie
    app.get('/api/movies/:mid/comments', (req, res) => {
        const tmdbId = req.params['mid'];
        RCRDao.findAllRatingAndCommentOrReviewsForMovie(tmdbId)
            .then(comments => res.json(comments))
    });
}
