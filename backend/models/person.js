const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');

const personSchema = new Schema({
  sqlId: Number,
  firstName: {
    type: String,
    intl: true
  },
  lastName: {
    type: String,
    intl: true
  },
  patronymic: {
    type: String,
    intl: true
  },
  pseudonym: {
    type: String,
    intl: true
  },
  birthDate: String,
  deathDate: String,
  profession: {
    type: String,
    intl: true
  },
  description: {
    type: String,
    intl: true
  },
  source: String,
  wikiLink: String,
  photoLinks: [ String ],
  mainPhotoLink: String
});

/**
 * Get all persons without description
 * @param {Object} query - mongodb query
 * @returns {Object}
 */
personSchema.statics.fetchAll = function (query) {
  return this.find(query)
    .select('-description');
};

personSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('persons', personSchema);
