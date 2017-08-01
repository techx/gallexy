const randomize = require("randomatic");
const mailer = require('./mail');
const passport = require('passport');
const User = require('../models/User');
const bCrypt = require('bcrypt-nodejs');
const LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use('signup', new LocalStrategy({
      passReqToCallback : true
  },
  function(req, email, password, done) {
    var findOrCreateUser = function() {

      var secureCode = randomize('Aa0', 15);
      var user = {
        email: req.body.email,
        password: req.body.password, //TODO check password confirmation on frontend, It's extra computing for the server
        security: {
          verified: false,
          code:secureCode
        }
      };

      User.createUser(user, function(err, newUser) {
        if (err) {
          return done(err);
        } else if (newUser) {
          //If user creation was successful, then we send them an email and redirect them to let them know
          mailer.newUserEmail(newUser);

          done(null, newUser, {message: "success"});
        } else {
          done(null, false, {message: "Unable to create new user"});
        }
      });
    };
    process.nextTick(findOrCreateUser);
  }));
};
