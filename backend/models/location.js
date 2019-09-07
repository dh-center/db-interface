const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('locations', locationSchema);
