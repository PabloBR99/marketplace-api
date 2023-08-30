const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema, 'users');

module.exports = { User };

// {"email": "test", "password": "test", "name": "test", "last_name": "test"}