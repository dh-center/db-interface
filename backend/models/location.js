const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');

const locationSchema = new Schema({
  name: {
    type: String,
    intl: true
  },
  addressesId: [ Schema.Types.ObjectId ],
  architects: {
    type: String,
    intl: true
  },
  constructionDate: String,
  demolitionDate: String,
  buildingType: {
    type: String,
    intl: true
  },
  description: {
    type: String,
    intl: true
  },
  coordinateX: Number,
  coordinateY: Number
});

locationSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('locations', locationSchema);
