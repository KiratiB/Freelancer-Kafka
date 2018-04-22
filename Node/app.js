var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var index = require('./routes/index');
var users = require('./routes/users');
var expressSessions = require("express-session")
var mongoStore = require("connect-mongo")(expressSessions);
var passport = require('passport');

var app = express();

//Enable CORS
var corsOptions = {
    origin: 'http://ec2-52-14-133-230.us-east-2.compute.amazonaws.com:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors(corsOptions))
app.use(cookieParser('CMPE273_passport'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var mongoSessionURL = "mongodb://root:kirati@ds243059.mlab.com:43059/freelancer";
// var mongoSessionURL = "mongodb://localhost:27017/freelancer";
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    saveUninitialized: true,
    duration: 30 * 60 * 1000,
    activeDuration: 15 * 30 * 1000,
    store: new mongoStore({
        url: mongoSessionURL,
        collection: 'sessions'
    })
}));
app.use(passport.initialize());
app.use(passport.session());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});

app.set('secret', 'CMPE273_passport');

module.exports = app;
