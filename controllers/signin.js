const User = require('../models/User');
const bCrypt = require('bcrypt-nodejs');
const LocalStrategy   = require('passport-local').Strategy;
// local passport strategy
module.exports = (passport) => {
  passport.use('signin', new LocalStrategy({
    passReqToCallback : true
  }, (req, email, password, done) => {

    //check the db if the user exists
    User.findOne({email : email}, (err, user) => {
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
