const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');

const locationTypeSchema = new Schema({
  sqlId: Number,
  name: {
    type: String,
    required: true,
    intl: true
  }
});

locationTypeSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('locationTypes', locationTypeSchema);
