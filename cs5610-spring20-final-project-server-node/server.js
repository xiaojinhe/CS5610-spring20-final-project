var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
multer();
app.use(session({
                    secret: 'this is the secret',
                    resave: true,
                    saveUninitialized: true
                }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Configure CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers",
               "Content-Type, X-Requested-With, Origin");
    res.header("Access-Control-Allow-Methods",
               "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

require('./data/db')()
require('./controllers/user.controller.server')(app)
require('./controllers/rating-comment-review.controller.server')(app)

app.listen(process.env.PORT || 3000);