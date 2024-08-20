const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = baseSchema;
