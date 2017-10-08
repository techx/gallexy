const mongoose = require('mongoose'),
      schema = mongoose.Schema,
      bcrypt = require('bcrypt-nodejs');

const settings = require('../settings');
// SCHEMA

const userSchema = schema({
  email: {type: String, required: true, lowercase: true, index: { unique: true }},
  password: {type: String, required: true},
  admin: {type: Boolean, default: false},
  projects: [{type: String}], //storing the ids use ObjectID
  info: {
    public: {type: Boolean, default: true},
    name: {type: String},
    year: {type: Number},
    study: {type: String},
    school: {type: String},
    bio: {type: String},
    picURL: {type: String}, //use AWS BLOB STORAGE??
    resumeURL : {type:String}
  },
  security: {
    verified: {type: Boolean, default: false},  //for ensuring the user has the given email, code can be deleted on verification
    code: {type: String},
    dateCreated: {type: Date, default: Date.now}
  }
});

// METHODS

// encryption (Salted hash)

userSchema.pre('save', function (next) {
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});


userSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        reject(err); 
      } else {
        resolve(isMatch);
      }
    });
  });
}

//returns a promise, either user or error
userSchema.statics.verify = (user) => {
  
  if(user.email && user.password) {
    user.email = user.email.toLowerCase();
    // Testing on a regex, not worried about effeciency on small input.
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(user.email)) {
      return Promise.resolve(user)
    } else {
      return Promise.reject(new Error("User email is not vaild"));
    }
  } else {
    return Promise.reject(new Error("User is missing fields"));
  }
};


// Returns a promise, to get the user, or an error
userSchema.statics.getUser = (checkEmail) => {
  return User.findOne({ email: checkEmail.toLowerCase()}).exec()
}

//user creation is also a promise
userSchema.statics.createUser = (user) => {
  return User.verify(user)
  .then((user) => {
    user.admin = settings.admins.includes(user.email);
    return Promise.resolve(user);
  })
  .then((user)=> {
    return User.getUser(user.email)
    .then((existingUser) => {
      if (!existingUser) {
        return Promise.resolve(new User(user));
      } else if (someUser.security.verified) {
        return Promise.reject(new Error('Verified user already exists.'));
      } else if (Date.now() - someUser.security.dateCreated < settings.verificationExpiration) {
        return Promise.reject(new Error('24 hours has not passed since last attempt to create account, please wait another day for current verification code to expire.'))
      } else{
        return User.updateUser(user); //In this case the security code is unverified, but user in system, update existing user.
      }
    })
    .then((user) => {
      return user.save()
    });
  });
  //when the promise is complete, it should return a saved user.
};

//also returns a promise
userSchema.statics.updateUser = (user) => {
  return User.getUser(user.email)
  .then((user) => {
    for (field in User.schema.paths) {
      oldUser[field.split(".")[0]] = user[field.split(".")[0]];
    };
    return oldUser.save()
  })
};

let User = mongoose.model('User', userSchema);
module.exports = User;
