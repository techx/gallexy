const User = require('../models/User');
const settings = require('../settings');

module.exports = (req, res, next) => {
  
  const Email_Hours = settings.verificationExpiration / 3600000

  let email = req.query.email;

  let findUser = new Promise((resolve, reject) => {
    User.getUser(email)
    .then((user) => {
      if (!user) {
        reject(new Error("Could not find user."));
      } else {
        resolve(user);
      }
    })
    .catch((err) => {
      reject(new Error("Database error, please try signing up again in " + Email_Hours + " hours."));
    }); 
  });

  let checkUser = (user) => {
    if ((Date.now() - user.security.dateCreated.getTime()) > settings.verificationExpiration) {
      return Promise.reject(new Error("Verification code expired, please try signing up again in " + Email_Hours + " hours."));
    } else if (req.query.code === user.security.code && !user.security.verified) {
      user.security.verified = true;
      user.security.code = null;
      return Promise.resolve(user);
    } else {
      return Promise.reject(new Error("Verification code does not match."));
    }
  };

  let saveUser = (user) => {
    user.save((err) => {
      if (err) {
        return Promise.reject(new Error("Could not verify user, please try signing up again in " + Email_Hours + " hours."));
      } else {
        return Promise.resolve();
      }
    });
  }

  let errorHandler = (err) => {
    res.render('error', { message: err });
  }

  findUser
  .then(checkUser)
  .then(saveUser)
  .then(() => {
    res.render('verified', { title: 'GalleXy | Verified', email: req.query.email });
  })
  .catch(errorHandler);
};