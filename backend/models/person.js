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
  sourceLink: String,
  wikiLink: String,
  photoLinks: [ String ],
  mainPhotoLink: String
});

personSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('persons', personSchema);
