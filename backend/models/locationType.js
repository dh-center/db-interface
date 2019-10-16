const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');

const locationTypeSchema = new Schema({
  sqlId: Number,
  name: {
    type: String,
    intl: true
  }
});

locationTypeSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('locationTypes', locationTypeSchema);
