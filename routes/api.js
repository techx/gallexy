const express = require('express');

const router = express.Router();

// GET verify page
router.get('/verify', function(req, res, next) {
  //TODO IGNORE THIS STUFF FOR NOW UNTIL SMTP IS SETUP.
  //TODO implement verification
  //verify by asking for req.query.email and req.query.code
  //and checking code.
  //test code as follows: /api/verify?email=alvareza&code=18274
  res.render('verified', {title: 'GalleXy | Sign Up', email: req.query.email});
});

router.get('/ping', function(req, res, next) {
  res.json({'data':'pong'});
});

// create new user
router.post('/signup');

// Token is assigned here
router.post('/signin');

//create new project
router.post('/new', function(req, res, next) {

});

router.get('/signout', function(req, res, next) {
  // expire token
  res.redirect('/');
});

module.exports = router;
