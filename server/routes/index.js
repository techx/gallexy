// IMPORTS //
var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var User = require('../models/User.js');
var Project = require('../models/Project.js');
var front_end_projects = require('project_templates.js');
// ROUTES //

/* GET splash page */
router.get('/', function(req, res, next) {
    res.render('../client/views/splash.html', [{link: , image: , title: , desc: }];
});

/* GET sign in page */
router.get('/signin', function(req, res, next) {
  res.render('../client/views/signin.html');
});
/* GET sign up page */
router.get('/signup', function(req, res, next) {
  res.render('../client/views/signup.html');
});
/* GET checkin page */
router.get('/checkin', function(req, res, next) {
  // only accessable if user authenticated
  res.render('../../client/views/checkin.html');
});
/* GET project page */
router.get('/project', function(req, res, next) {
  res.render('../../client/views/project.html');
});
/* GET author page */
router.get('/author', function(req, res, next) {
  // only accessable is user is autheticated
  res.render('../../client/views/author.html');
});
/* GET profile page */
router.get('/profile', function(req, res, next) {
  // only accessable if user is autheticated
  res.render('../../client/views/profile.html');
});
/* POST sign in request */
router.post('/signin', function(req, res, next) {
  // try to authenticate the user using the local passprt strategy

  // if sucessful, bring them to their home page,

  // if unsuccessful, redirect to signin page, with error (hbs)
res.redirect('/')
});
/* POST sign up request */
router.post('/signup', function(req, res, next) {
  // try to find a user that exists with all the necesary information, if so, redirect to the original webpage and give error message

  // if no user exists of that type, then continue with the process

  // add a new document to the database with the given information

  // redirect the user to the success page
  res.redirect('/');
});



module.exports = router;
