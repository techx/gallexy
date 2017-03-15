// IMPORTS //
var router = require('express').Router();
var path = require('path');
var passport = require('../passport');
var User = require('../models/User.js');
var Project = require('../models/Project.js');
// ROUTES //

/* GET splash page */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../../client/views/splash.html'));
});

/* GET sign in page */
router.get('/signin', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../client/views/signin.html'));
});
/* GET sign up page */
router.get('/signup', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../client/views/signup.html'));
});
/* GET checkin page */
router.get('/checkin', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../client/views/checkin.html'));
});
/* GET project page */
router.get('/project', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../client/views/project.html'));
});
/* GET author page */
router.get('/author', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../client/views/author.html'));
});
/* GET profile page */
router.get('/profile', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../client/views/profile.html'));
});
/* POST sign in request */
router.post('/signin', function(req, res, next) {

});
/* POST sign up request */
router.post('/signup', function(req, res, next) {

});
module.exports = router;
