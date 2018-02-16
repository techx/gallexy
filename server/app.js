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
const expressSession = require('express-session');
const initPassport = require('./controllers/passport-init');

//import custom system settings
const settings = require('./settings');

// import routes
const index = require('./routes/index');
const api = require('./routes/api');
const user = require('./routes/user');
const project= require('./routes/project');
const auth = require('./routes/auth');

// initialize application
const app = express();

mongoose.connect(settings.mongoHost + settings.mongoUri, {useMongoClient:true});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', function() {
  console.log("database connected!");
});

//Ensure mongoose is using the default promise engine
mongoose.Promise = global.Promise
//remember mongoose queries are not promise unless you do query.exec()
//however, functions like .save() are


// view engine setup
app.set('views', ['../client/views', '../client/views/user', '../client/views/project', '../client/views/auth'].map((str) => {return path.join(__dirname, str);}));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/../client/views/partials' , function() {
  console.log("Partials loaded...");
});
hbs.registerHelper('if_lteqngt', function(val, under, upper, opts) {
    if (val <= upper && val > under) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
hbs.registerHelper('isContext', function(option, viewdata) {
  var currentContext = viewdata.data.root.context;
  if ((typeof currentContext) != 'string') {
    return viewdata.inverse(this);
  } else if (currentContext == option) {
    return viewdata.fn(this);
  } else {
    return viewdata.inverse(this);
  }
});

// middleware
console.log("Loading middleware...");
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
// security
app.use(expressSession({
  secret: settings.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: settings.https }
}));
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

// routes
console.log("Loading routes");
app.use('/', index);
app.use('/api', api);
app.use('/project', project);
app.use('/user', user);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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
