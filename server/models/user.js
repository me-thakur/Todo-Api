const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//THINGS YOU WANT TO SEND TO THE USER some properties are security related
UserSchema.methods.toJSON = function() {
  var user = this;
  var UserObject = user.toObject();

  return _.pick(UserObject, ['_id','email']);
};


//AUTHENTICATE THE USER AND SEND IT IT TO tokens ARRAY IN SCHEMA
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {token}
  });
};
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
};

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if(!user) {
      return Promise.reject();
    }
    //bcrypt works on callbacks so a new promise is to be returned
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        }  else {
          reject();
        }
      })
    });
  });
};

//CHANGES BEFROE SAVING TODOS TO THE DATABASE LIKE ADDING A HASHPASSWORD
UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')){
    bcrypt.genSalt(10,  (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
})

var User = mongoose.model('User', UserSchema);


module.exports = {User};







// var newUser = new User({
//   email: {
// type: String,
// required: true
// }
// });
//
// var newUser = new User({
//    email: 'thakurvivek1296@gmail.com'
//   // completed: true,
//   // completedAt: 123
// });
//
// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Email is required');
// });
