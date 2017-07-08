// import modules
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const helmet = require('helmet');
const mongoose = require('mongoose');

// security
const passport = require('passport');
const initPassport = require('./controllers/passport');

//import custom system settings
const settings = require('./settings');

// import routes
const index = require('./routes/index');
const api = require('./routes/api');

// initialize application
const app = express();

// connect to database
/*/var db = mongoose.createConnection("mongodb://localhost/" + settings.mongoUri);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('connected', function (callback) {
    console.log("database connected!");
});
*/ //TODO MANY MONGOOSE FUNCTIONS ARE NOW "depricated", update connection script
mongoose.connect("mongodb://localhost/" + settings.mongoUri);

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'database connection error:'));
connection.on('connected', function() {
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
console.log("Loading middleware...");
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// security
initPassport(passport);
app.use(passport.initialize());

// routes
console.log("Loading routes");
app.use('/', index);
app.use('/api', api);

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
