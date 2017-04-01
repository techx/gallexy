var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var helmet = require('helmet');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var hbs = require('hbs');

// SERVER FILES //
var config = require('./config');

// ROUTE HANDLERS //
var index = require('./routes/index');

// APP //
var app = express();

// DATABASE //
mongoose.connect("mongodb://localhost/" + config.mongoUri);

var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.on('connected', function() {
  console.log("database connected!");
});

// VIEW ENGINE //
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname , 'views/partials'))

// MIDDLEWARES //

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet()); // bunch of security stuff

// ROUTES //
app.use('/', index);

// ERRORS //
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render('500');
});

module.exports = app;
