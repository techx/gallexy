const User = require('../models/User');
const bCrypt = require('bcrypt-nodejs');
const LocalStrategy   = require('passport-local').Strategy;
// local passport strategy
module.exports = function(passport) {
  passport.use('signin', new LocalStrategy({
    passReqToCallback : true
  }, function(req, email, password, done) {

    //check the db if the user exists
    User.findOne({email : email}, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'User not found' });
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
      }
    });
  }));
};
