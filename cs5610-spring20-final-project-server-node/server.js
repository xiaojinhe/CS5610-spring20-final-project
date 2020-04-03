var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('./data/db')();
var mongodbStore = require('connect-mongo')(session);
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
                    secret: 'this is the secret',
                    resave: false,
                    saveUninitialized: false,
                    store: new mongodbStore({mongooseConnection: mongoose.connection})
                }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require('./controllers/user.controller.server')(app)
require('./controllers/rating-comment-review.controller.server')(app)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../cs5610-spring20-final-project-client-react/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,
                               '../cs5610-spring20-final-project-client-react',
                               'build',
                               'index.html')); // relative path
    });
}

app.listen(process.env.PORT || 8080);
