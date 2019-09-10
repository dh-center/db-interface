const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');

const relationSynonymSchema = new Schema({
  sqlId: Number,
  name: {
    type: String,
    required: true,
    intl: true
  }
});

const relationTypeSchema = new Schema({
  sqlId: Number,
  name: {
    type: String,
    required: true,
    intl: true
  },
  synonyms: {
    type: [ relationSynonymSchema ]
  }
});

relationTypeSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('relationTypes', relationTypeSchema);
