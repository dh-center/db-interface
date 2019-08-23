const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jsonpatch = require('fast-json-patch');

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
  }
});

personSchema.statics.getChangesList = async function (personId, modifiedData) {
  console.log(personId);
  console.log(modifiedData);
  const person = personId ? await this.findById(personId).lean() : {};

  delete person._id;
  delete person.__v;
  delete modifiedData._id;
  delete modifiedData.__v;

  return jsonpatch.compare(person, modifiedData);
};

module.exports = mongoose.model('persons', personSchema);
