const mongoose = require('mongoose');
const baseSchema = require('./baseSchema');
const stateSchema = new mongoose.Schema({
    countryId: {
      type: String,
      required: true,
    }
  });
  
  // Inherit from base schema
  stateSchema.add(baseSchema.obj);
  
module.exports = mongoose.model('state', stateSchema);