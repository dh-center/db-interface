const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: String,
  pseudonym: String,
  birthDate: Date,
  deathDate: Date,
  profession: String,
  title: String,
  description: String,
  source: String,
  image: String
});

module.exports = mongoose.model('persons', personSchema);
