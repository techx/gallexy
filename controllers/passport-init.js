let signin = require('./signin');
let signup = require('./signup');
let User = require('../models/User');

module.exports = (passport) => {
  let passportInit = new Promise((resolve, reject) => {
    console.log("Begining to intiailize passport");
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    });
    
    resolve(passport);
  });

  passportInit
  .then(signup)
  .then(signin)
  .then((passport) => {
    console.log("Passport successfully initialized.");
  })
  .catch((err) => {
    console.log("Passpot was not initialized properly...");
    console.log(err);
  });
};
