const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');

const relationSchema = new Schema({
  locationId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'locations'
  },
  relationId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'relationTypes'
  },
  personId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'persons'
  },
  quote: {
    type: String,
    intl: true
  }
});

relationSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('relations', relationSchema);
