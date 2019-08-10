const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  firstName: String,
  lastName: String,
  patronymic: String,
  pseudonym: String,
  birthDate: Date,
  deathDate: Date,
  profession: String,
  description: String
});

module.exports = mongoose.model('persons', personSchema);
