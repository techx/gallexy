var express = require('express');
var router = express.Router();

/* TODO implement authentication */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GalleXy', loggedIn: (Math.random() > .5), isAdmin: (Math.random() > .5) });
});

router.get('/project', function(req, res, next) {
  res.render('project', { title: 'GalleXy | Project', progress:1});
});

router.get('/signin', function(req, res, next) {
  res.render('signin', {title: 'GalleXy | Sign In'});
});

router.get('/signup', function(req, res, next) {
  res.render('signup', {title: 'GalleXy | Sign Up'});
});

router.get('/signout', function(req, res, next) {
  // deauthenticate/ expire the user session, and redirect to index page
  res.redirect('/');
});

router.get('/admin', function(req, res, next) {
/* TODO ONLY RENDER PAGE IF AUTHENTCATED, OTHERWISE REDIRECT "You do not have permission to view that page" */
});






module.exports = router;
