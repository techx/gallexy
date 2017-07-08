const express = require('express');
const router = express.Router();
const passport = require('passport');

const Project = require('../models/Project');

const auth = require('../controllers/auth');
const settings = require('../settings');

// GET verify page
router.get('/verify', auth.verify);

//Pretty much every API route will have a 'message', so the status of the message can be resloved
router.get('/ping', function(req, res, next) {
  res.status(200).json({'message':'pong'});
});

// create new user
router.post('/signup', auth.signup);

// Token is assigned here
router.post('/signin', auth.signin);

router.get('/secret', passport.authenticate('jwt', {session:false, failureRedirect: '/login'}), function(req, res) {
  res.json({message:"success! You can not see this without a token!"});
});

//create new project
router.post('/new', function(req, res, next) {

});

router.get('/signout', function(req, res, next) {
  // expire token
  res.redirect('/');
});

module.exports = router;
