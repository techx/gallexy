// IMPORTS //
var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var User = require('../models/User');
var Project = require('../models/Project');
var front_end_projects = require('./project_templates');
var mongoose = require('mongoose');
// ROUTES //

/* GET splash page */
router.get('/', function(req, res, next) {
    res.render('splash', {projects: [front_end_projects.generic_project,
                                     front_end_projects.harambe_project,
                                     front_end_projects.dat_boi_project,
                                     front_end_projects.Feels_good_man_project,
                                     front_end_projects.tims_project]});
});

/* GET sign in page */
router.get('/signin', function(req, res, next) {
  res.render('signin');
});
/* GET sign up page */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
/* GET checkin page */
router.get('/checkin', function(req, res, next) {
  // only accessable if user authenticated
  res.render('checkin');
});
/* GET project page */
router.get('/project', function(req, res, next) {
  res.render('project');
});
/* GET author page */
router.get('/author', function(req, res, next) {
  // only accessable is user is autheticated
  res.render('author');
});
/* GET profile page */
router.get('/profile', function(req, res, next) {
  // only accessable if user is autheticated
  res.render('profile');
});
/* POST sign in request */

router.get('/signOut', function(req, res) {
  req.logout();
  res.redirect('back');
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/signup'
}));

/* POST SIGN IN REQUEST */
router.post('/signin', passport.authenticate('signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
}));


module.exports = router;
