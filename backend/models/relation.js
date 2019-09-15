const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');
const Person = require('./person');
const Location = require('./location');
const RelationType = require('./relationType');

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

/**
 * Get all relations with all their data
 * @param {Object} query - mongodb query
 * @returns {Object}
 */
relationSchema.statics.fetchAll = function (query) {
  return this.find(query)
    .populate('personId')
    .populate('relationId')
    .populate('locationId');
};

/**
 * Get relation with all data
 * @param entityId
 * @returns {Query}
 */
relationSchema.statics.fetchById = function (entityId) {
  return this.findById(entityId)
    .populate('personId')
    .populate('relationId')
    .populate('locationId');
};

/**
 * Process changed entity before give a response to the client
 * @param {Object} changedEntity
 * @returns {Promise<void>}
 */
relationSchema.statics.processChangedEntity = async function (changedEntity) {
  if (changedEntity.personId){
    changedEntity.personId = await Person.findById(changedEntity.personId);
  }

  if (changedEntity.relationId) {
    changedEntity.relationId = await RelationType.findById(changedEntity.relationId);
  }

  if (changedEntity.locationId) {
    changedEntity.locationId = await Location.findById(changedEntity.locationId);
  }
};

relationSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('relations', relationSchema);
