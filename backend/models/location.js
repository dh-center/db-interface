const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');

const locationSchema = new Schema({
  name: {
    type: String,
    intl: true
  },
  addressesId: [ {
    type: Schema.Types.ObjectId,
    ref: 'addresses'
  } ],
  architects: {
    type: String,
    intl: true
  },
  constructionDate: String,
  demolitionDate: String,
  locationTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'locationTypes'
  },
  description: {
    type: String,
    intl: true
  },
  wikiLink: String,
  photoLinks: [ String ],
  mainPhotoLink: String,
  coordinateX: Number,
  coordinateY: Number
});

locationSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('locations', locationSchema);
