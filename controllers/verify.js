const User = require('../models/User');
const settings = require('../settings');

module.exports = function(req, res, next) {
  var email = req.query.email;

  User.getUser(email, function(err, user) {
    if (err) {
      res.render('error', {message: 'Could not verify user, please try signing up again in 24 hours.'});
    } else if (!user) {
      res.render('error', {message: 'Could not verify user, please try signing up again in 24 hours.'});
    } else if ((Date.now() - user.security.dateCreated.getTime() ) > settings.verificationExpiration) {       //BUG FIXED: WAS USING WRONG OPERATION TO EXPIRE SECURITY CODES
      res.render('error', {message: 'Verification code expired, please try signing up again'});
    } else {
      if (req.query.code === user.security.code && !user.security.verified) {
        // update user
        user.security.verified = true;
        user.security.code = null;
        user.save(function (err) {
          if (err) {
            res.render('error', {message: 'Could not verify user, please try signing up again in 24 hours.'});
          } else {
            res.render('verified', {title: 'GalleXy | Verify', email: req.query.email});
          }
        });
      } else {
        res.render('error', {message: 'Could not verify user, please try signing up again in 24 hours.'});
      }
    }
  });
};
