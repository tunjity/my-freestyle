const mongoose = require('mongoose');

const baseSchema = require('./baseSchema');
const countrySchema = new mongoose.Schema();
  
  // Inherit from base schema
  countrySchema.add(baseSchema.obj);
  
module.exports = mongoose.model('country', countrySchema);