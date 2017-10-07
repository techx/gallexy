let login = require('./signin');
let signup = require('./signup');
let User = require('../models/User');

module.exports = (passport) => {
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  signup(passport);
  login(passport);
};
