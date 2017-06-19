// import modules
const express = require('express'),
      path = require('path'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      hbs = require('hbs'),
      helmet = require('helmet'),
      mongoose = require('mongoose'),

      settings = require('./settings');
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

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

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
