const User = require('../models/User');
const bCrypt = require('bcrypt-nodejs');
const LocalStrategy   = require('passport-local').Strategy;
// local passport strategy
module.exports = (passport) => {
  passport.use('signin', new LocalStrategy({
    passReqToCallback : true
  }, (req, email, password, done) => {

    //check the db if the user exists
    User.findOne({email : email})
    .exec()
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'User not found' });
      } else {
        return Promise.resolve(user);
      }
    })
    .then((user) => {
      return user.comparePassword(password)
        .then((isMatching) => {
        if (isMatching) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    })
    .catch((err) => {
      return done(err);
    })
  }));

  return Promise.resolve(passport);
};
