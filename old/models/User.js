// IMPORTS //

var mongoose = require('mongoose');


// TODO: figure out why mongoose throws an overwriteerror if i don't have these lines of code, and figure out what effects they may have on other bits of code
mongoose.models = {};
mongoose.modelSchemas = {};

var bCrypt = require('bcrypt-nodejs');
// SCHEMA //
var userSchema = mongoose.Schema({
  email: { type: String, required: true, lowercase: true, index: { unique: true } }, // unique identifier
  password: {type: String, requied: true}, // don't worry, salted and hashed
  name: { type: String , required: true},
  projects: [{type: mongoose.Schema.ObjectId, ref: 'Project'}],
  isAdmin: { type: Boolean, required: true}
});

// TODO update methods and implement them in passport and routes
// METHODS //

/** VALIDATE USER
* returns false if the user is valid, and a string if not. meaning:
*  the email is not already in use
*  the email is an @mit.edu email, and exists in the directory
*  the email, name and password fields are populated
* @param user - the user object to test
* @param callback - callback to the function
*/
userSchema.statics.validate = function(user, callback) {
  user.email = user.email.toLowerCase();
  User.find({ email: user.email }, function(err, results) {
    if (err) {
      console.error(err);
      throw err;
      callback("There was an error when looking for similar users");
    }
    else if (results.length > 0) {
      callback("User already exists");
    } else {
      if (user.email.substr(user.email.length - 8) === "@mit.edu") {
        if (typeof(user.email) === String && typeof(user.name) === String && typeof(user.password) === String) {
          callback(null, user); //when the user is valid
        } else {
          callback("One of the fields are incomplete");
        }
      } else {
        callback("Not an mit.edu email");
      }
    }
  });
};
/**
 * Find a user if exists; callback error otherwise
 * @param email {string} - email of a potential user
 * @param callback {function} - function to be called with err and result
 */
userSchema.statics.get = function(email, callback) {
  User.find({ email: email.toLowerCase() }, function(err, results) {
      if (err) callback(err);
      else if (results.length > 0) {
          callback(null, results[0]);
      } else callback('User not found');
  });
}

/**
 * Create a new user
 * @param user {object} - user object to be created (must have unique email field)
 * @param callback {function} - function to be called with err and result
 */
userSchema.statics.create = function (user, callback) {
  var newUser = new User();
  newUser.password =  bCrypt.hashSync(user.password, bCrypt.genSaltSync(10), null); //im not sure what this should really be TODO figure out bcrypt hash
  newUser.email = user.email.toLowerCase();
  newUser.name = user.name;
  newUser.projects = [];
  newUser.isAdmin = false;
  newUser.save(function(err) {
    if (err) {
      console.log("error saving user");
      throw err;
    }
    console.log('New user created');
    return done(null, newUser);
  });
}

/**
 * Update given user
 * @param user {object} - new user object (with email as identifier)
 * @param callback {function} - function to be called with err and result
 */
userSchema.statics.update = function (user, callback) {
    User.getUser(user.email, function (err, oldUser) {
        if (err) callback(err);
        else {
            for (field in User.schema.paths) {
                oldUser[field.split(".")[0]] = user[field.split(".")[0]];
            };
            oldUser.save(function (err) {
                if (err) callback('Error saving project: ' + err);
                else callback(null, oldUser);
            });
        }
    })
}


// EXPORTS //
module.exports = mongoose.model('User', userSchema);
