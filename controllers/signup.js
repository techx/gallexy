const randomize = require("randomatic");
const mailer = require('./mail');
const passport = require('passport');
const User = require('../models/User');
const bCrypt = require('bcrypt-nodejs');
const LocalStrategy   = require('passport-local').Strategy,
      settings = require('../settings.js');


module.exports = function(passport) {
  passport.use('signup', new LocalStrategy({
      passReqToCallback : true
  },
  function(req, email, password, done) {
    var findOrCreateUser = function() {

      var secureCode = randomize('Aa0', 15);
      var user = {
        email: email,
        password: password,
        security: {
          verified: false,
          code:secureCode
        }
      };

      if (settings.devMode) {
        user.security.verified = true;
      }

      User.createUser(user, function(err, newUser) {
        if (err) {
          return done(err);
        } else if (newUser) {
          //If user creation was successful, then we send them an email and redirect them to let them know
          if (!settings.devMode) {
            mailer.newUserEmail(newUser);
          }
          done(null, newUser, {message: "success"});
        } else {
          done(null, false, {message: "Unable to create new user"});
        }
      });
    };
    process.nextTick(findOrCreateUser);
  }));
};
