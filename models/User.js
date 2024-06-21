const mong = require("mongoose");

const UserSchema = mong.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  token: {
    type: String, 
    required: true
  }
});

module.exports = mong.model('User', UserSchema);
