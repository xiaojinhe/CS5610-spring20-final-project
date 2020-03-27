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
    //change 'http://localhost:3001' to where your client is running
    res.header("Access-Control-Allow-Origin", 'http://localhost:3001');
    res.header("Access-Control-Allow-Headers",
               "Content-Type, X-Requested-With, Origin");
    res.header("Access-Control-Allow-Methods",
               "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Credentials',
        'true');
    next();
});

require('./data/db')()
require('./controllers/user.controller.server')(app)
require('./controllers/rating-comment-review.controller.server')(app)

app.listen(process.env.PORT || 3000);
