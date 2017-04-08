var passport = require('passport');
var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');
var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  }, function(req, email, password, done) {
      var findOrCreateUser = function() {
        var user = {
          email: req.body.email,
          password: req.body.password,
          name: req.body.name
        };
        User.validate(user, function(err, user) {
          if (err) {
            done(null, false, {message: err});
          } else {
            if (password === req.body.passwordConfirm) {
              User.create(user, function(err, newUser) {
                if (err) {
                  return done(null, false, {message: 'error saving new user'});
                }
                console.log("new user created: " + newUser.email);
                return done(null, newUser);
              });
            } else {
              return done(null,false, {message: 'Passwords do not match'});
            }
          }
        });
    };
  process.nextTick(findOrCreateUser);
  }));
};
