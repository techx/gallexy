// import modules
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var helmet = require('helmet');
var mongoose = require('mongoose');

var settings = require('./settings');
// import routes
var index = require('./routes/index');
var search = require('./routes/search');
var secure = require('./routes/secure');
var admin = require('./routes/admin');

// initialize application
var app = express();

// connect to database
mongoose.connect("mongodb://localhost/" + settings.mongoUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("database connected!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials' , function() {
  console.log("Partials loaded...");
});
hbs.registerHelper('if_lteqngt', function(val, under, upper, opts) {
    if (val <= upper && val > under) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

// middleware

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes

app.use('/', index);
app.use('/', search);
app.use('/', secure);
app.use('/', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
