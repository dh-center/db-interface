const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');
const LocationType = require('./locationType');

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
  photoLinks: String,
  mainPhotoLink: String,
  coordinateX: Number,
  coordinateY: Number
});

locationSchema.plugin(getChangesListPlugin);

/**
 * Get all relations with all their data
 * @param {Object} query - mongodb query
 * @returns {Object}
 */
locationSchema.statics.fetchAll = function (query) {
  return this.find(query)
    .populate('locationTypeId');
};

/**
 * Process changed entity before give a response to the client
 * @param {Object} changedEntity
 * @returns {Promise<void>}
 */
locationSchema.statics.processChangedEntity = async function (changedEntity) {
  if (changedEntity.locationTypeId) {
    changedEntity.locationTypeId = await LocationType.findById(changedEntity.locationTypeId);
  }
};

module.exports = mongoose.model('locations', locationSchema);
