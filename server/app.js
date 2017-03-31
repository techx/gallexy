// PACKAGES //
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var helmet = require('helmet');
var fs = require('fs');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var cookieSession = require('cookie-session');
var formidable = require('formidable');
// SERVER FILES //
var config = require('../config');

// ROUTE HANDLERS //
var index = require('./routes/index');

// APP //
var app = express();

// DATABASE //
mongoose.connect(config.mongoUri);

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.on('connected', console.log("database connected"));

// VIEW ENGINE //

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'client/views'));

// MIDDLEWARE //

app.use(express.static(__dirname + '/../client')); // set static folder
app.use(cookieSession({secret: config.cookieSecret}));
app.use(bodyParser.json()); // parse json
app.use(bodyParser.urlencoded({ extended: true })); // parse forms
app.use(helmet()); // bunch of security stuff

// ROUTES //
app.use('/', index); // index routes

// ERROR HANDLERS //

app.use(function(req, res) {
  res.type('text/html');
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
   console.error(err.stack);
   res.status(err.status || 500);
   res.render('500');
});

module.exports = app;
