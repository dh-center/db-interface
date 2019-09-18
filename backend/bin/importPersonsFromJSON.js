const persons = require('./data/peopleDetails');
const asyncForEach = require('./parserFromGSheets/asyncForEach');
const path = require('path');

/**
 * Read environment settings
 */
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Setup DB
 */
require('../modules/db');

const Person = require('../models/person');

/**
 * Import persons from JSON file
 * @return {Promise<void>}
 */
async function main() {
  await asyncForEach(persons, async function (person) {
    const name = person.name;
    let lastName, firstName, patronymic;

    if (name.split(' ').length === 3 && name.split(' ')[1].length > 3) {
      lastName = name.split(' ')[0];
      firstName = name.split(' ')[1];
      patronymic = name.split(' ')[2];
    } else if (name.split(' ').length === 3) {
      firstName = name.split(' ')[0] + ' ' + name.split(' ')[1];
      lastName = name.split(' ')[2];
    } else {
      firstName = name.split(' ')[0];
      lastName = name.split(' ')[1];
    }
    if (!await Person.findOne({ lastName: lastName, firstName: firstName })) {
      const birthDate = person.lifeDates[0];
      let deathDate;

      if (person.lifeDates[1]) {
        deathDate = person.lifeDates[1];
      }
      const personObject = {
        lastName: lastName,
        firstName: firstName,
        patronymic: patronymic,
        birthDate: birthDate,
        deathDate: deathDate,
        profession: person.shortInfo
      };
      const newPerson = new Person(personObject);

      await newPerson.save();
      console.log(`Person ${lastName} was saved!`);
    }
  });
  process.exit();
}

main();
