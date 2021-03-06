const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail, //gets passed the value and returns true/false
      message: "{VAlUE} is not a valid email"
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: { //"access" is an object
      type: String, // "type" is an attribute of the access object
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});
//Overriding the method (mongoose in-house) toJSON()
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ["_id", "email"]);
};

//Creating a new method
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = "auth";
  var token = jwt.sign({_id: user._id.toHexString(), access}, "abc123").toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, "abc123");
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

var User = mongoose.model("User", UserSchema);

module.exports = {User};
