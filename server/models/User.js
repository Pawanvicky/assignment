const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  contact: {
    type: String,
    required: true,
    min: 10,
    max: 10
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  userrole: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "Not Active"
  }
});

module.exports = mongoose.model('User', userSchema);
