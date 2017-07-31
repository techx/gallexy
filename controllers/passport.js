const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const settings = require('../settings');

const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function(passport) {
  const jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader(); //required
  jwtOptions.secretOrKey = settings.secret; //required

  passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
      User.findOne({id: jwt_payload.sub}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              return done(null, user);
          } else {
              return done(null, false);
              // or you could create a new account
          }
      });
  }));

};
