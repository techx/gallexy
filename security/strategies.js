const passport = require('passport'),
      User = require('../models/User'),
      settings = require('../settings'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

//setting up local options
const localOptions = {usernameField: 'email'};

// setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({email: email}, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { error: "We couldn't find you. Please make sure to use a valid account, or sign up."});
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, {error: "Your login details could not be verified, Please try again."});
      }
      return done(null, user);
    });
  });
});

// setting up JWT authentication OPTIONS
const jwtOptions = {
  // tell passport to check auth headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // tell passport where to find secret
  secretOrKey: settings.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
});

passport.use(jwtLogin);
passport.use(localLogin);
