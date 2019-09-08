const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');

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

addressSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('addresses', addressSchema);
