const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');

const relationTypeSchema = new Schema({
  sqlId: Number,
  name: {
    type: String,
    required: true,
    intl: true
  }
});

relationTypeSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('relationTypes', relationTypeSchema);
