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
  },
   createdBy: {
    type: String,
    required: true,
  },
  deletedBy: {
    type: String,
    required: false,
  },
   modifiedBy: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
});


module.exports = mongoose.model('User', UserSchema);