var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// For parsing application/json
app.use(bodyParser.json());

// Configure CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers",
               "Content-Type, X-Requested-With, Origin");
    res.header("Access-Control-Allow-Methods",
               "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

require('data/db')
require('controllers/user.controller.server')(app)
require('controllers/rating-comment-review.controller.server')(app)

app.listen(process.env.PORT || 3000);
