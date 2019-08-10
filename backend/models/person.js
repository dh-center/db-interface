const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
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
  birthDate: Date,
  deathDate: Date,
  profession: {
    type: String,
    intl: true
  },
  description: {
    type: String,
    intl: true
  }
});

module.exports = mongoose.model('persons', personSchema);
