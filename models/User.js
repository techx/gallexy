// IMPORTS //
var mongoose = require('mongoose');


// SCHEMA //
var userSchema = mongoose.Schema({
    email: { type: String, required: true, lowercase: true, index: { unique: true } }, // unique identifier
    isAdmin: { type: Boolean, required: true },
    name: { type: String },
    course: { type: String },
    year: { type: String },
    interests: { type: String }
});


// METHODS //

/**
 * Find a user if exists; callback error otherwise
 * @param email {string} - email of a potential user
 * @param callback {function} - function to be called with err and result
 */
userSchema.statics.getUser = function(email, callback) {
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
userSchema.statics.createUser = function (user, callback) {
    user.email = user.email.toLowerCase();
    user.isAdmin = false;
    User.find({ email: user.email }, function (err, results) {
        if (err) callback(err);
        else if (results.length === 0) {
            var newUser = new User(user);
            newUser.save(function (err) {
                if (err) callback('Error saving user: ' + err);
                else callback(null, newUser);
            });
        } else callback('User already exists');
    });
}

/**
 * Update given user
 * @param user {object} - new user object (with email as identifier)
 * @param callback {function} - function to be called with err and result
 */
userSchema.statics.updateUser = function (user, callback) {
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
var User = mongoose.model('User', userSchema);
module.exports = User;
