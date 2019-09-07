const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: {
    type: String,
    intl: true
  },
  homeNumber: String,
  housing: String,
  build: {
    type: String,
    intl: true
  }
});

module.exports = mongoose.model('addresses', addressSchema);
