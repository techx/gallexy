const randomize = require("randomatic");
const mailer = require('./mail');
const passport = require('passport');
const User = require('../models/User');
const bCrypt = require('bcrypt-nodejs');
const LocalStrategy   = require('passport-local').Strategy,
      settings = require('../settings.js');


module.exports = (passport) => {
  passport.use('signup', new LocalStrategy({
      passReqToCallback : true
  },
  (req, email, password, done) => {
    let findOrCreateUser = () => {

      let secureCode = randomize('Aa0', 15);
      let user = {
        email: email,
        password: password,
        security: {
          verified: false,
          code:secureCode
        }
      };

      // If the server is in development mode, don't bother sending an email
      if (settings.devMode) {
        user.security.verified = true;
      }

      User.createUser(user)
      .then((user) => {
        if (user) {
          if (!settings.devMode) {
            mailer.newUserEmail(user);
          }
          return done(null, user, { message: "success" });
        } else {
          return done(null, false, { message: "Unable to create new user" });
        }
      })
      .catch((err) => {
        return done(err);
      });
    };
    process.nextTick(findOrCreateUser);
  }));

  return Promise.resolve(passport);
};
