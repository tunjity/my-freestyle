const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  state: {
    type: Number,
    required: true,
  },
  country: {
    type: Number,
    required: true,
  }, isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});


module.exports = mongoose.model('User', UserSchema);