const { google } = require('googleapis');
const credentials = require('./credentials');
const path = require('path');
const asyncForEach = require('./asyncForEach');

/**
 * Read environment settings
 */
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

/**
 * Setup DB
 */
require('../../modules/db');

const Person = require('../../models/person');
const Address = require('../../models/address');
const Location = require('../../models/location');
const RelationType = require('../../models/relationType');
const LocationType = require('../../models/locationType');
const Relation = require('../../models/relation');

const client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  [ 'https://www.googleapis.com/auth/spreadsheets.readonly' ]
);

client.authorize(async function (error, tokens) {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected!');
    await importRelationTypes(client);
    await importLocationTypes(client);
    await importPersons(client);
    await importLocations(client);
    await importAddresses(client);
    await importRelations(client);
    process.exit();
  }
});

/**
 * Get person's data from gSheets
 * @param cl
 * @returns {Promise<void>}
 */
async function importPersons(cl) {
  const gsApi = google.sheets({ version: 'v4', auth: cl });
  const sheetInfo = {
    spreadsheetId: '1ixL6QPibf6jg3EUPwNoigvN2V1bqOvv4eAQpU74_ros',
    range: '\'Персоны\''
  };

  const response = await gsApi.spreadsheets.values.get(sheetInfo);
  let personsArray = response.data.values.slice(2);

  personsArray = personsArray.reduce(function (result, row) {
    if (row.length > 1) {
      while (row.length < 13) {
        row.push('');
      }
      row = row.map(rowItem => rowItem.trim());
      result.push(row);
    }
    return result;
  }, []);

  let index = 1;

  await asyncForEach(personsArray, async function (personRow) {
    const person = {};

    person.lastName = personRow[0];
    person.firstName = personRow[1];
    person.patronymic = personRow[2];
    person.pseudonym = personRow[3];
    person.birthDate = personRow[4];
    person.deathDate = personRow[5];
    person.profession = personRow[6];
    person.description = personRow[7];
    person.source = personRow[8];
    person.wikiLink = personRow[9];
    person.photoLinks = personRow[10].split(',').map(link => link.trim()).join('\n'); // Remove spaces
    person.mainPhotoLink = personRow[11];
    const newPerson = new Person(person);

    await newPerson.save();
    console.log(`Person #${index++} was saved!`);
  });
}

/**
 * Get addresses data from gSheets
 * @param cl
 * @returns {Promise<void>}
 */
async function importAddresses(cl) {
  const gsApi = google.sheets({ version: 'v4', auth: cl });

  // Get array of addresses
  const sheetInfo = {
    spreadsheetId: '1ixL6QPibf6jg3EUPwNoigvN2V1bqOvv4eAQpU74_ros',
    range: '\'Адреса\''
  };

  const response = await gsApi.spreadsheets.values.get(sheetInfo);
  let addressesArray = response.data.values.slice(2);

  addressesArray = addressesArray.reduce(function (result, row) {
    if (row.length > 1) {
      while (row.length < 6) {
        row.push('');
      }
      row = row.map(rowItem => rowItem.trim());
      result.push(row);
    }
    return result;
  }, []);

  // Save addresses to mongoDB
  let index = 1;

  await asyncForEach(addressesArray, async function (addressRow) {
    const address = {
      street: addressRow[0],
      homeNumber: addressRow[1],
      housing: addressRow[2],
      build: addressRow[3],
      link: addressRow[4]
    };

    const newAddress = new Address(address);

    await newAddress.save();
    console.log(`Address #${index++} was saved!`);
    await Location.updateMany({ 'name.ru': addressRow[5] }, { $push: { addressesId: newAddress._id } });
  });
}

/**
 * Get location's data from gSheets
 * @param cl
 * @returns {Promise<void>}
 */
async function importLocations(cl) {
  const gsApi = google.sheets({ version: 'v4', auth: cl });

  // Get array of locations
  const sheetInfo = {
    spreadsheetId: '1ixL6QPibf6jg3EUPwNoigvN2V1bqOvv4eAQpU74_ros',
    range: '\'Локации\''
  };

  const response = await gsApi.spreadsheets.values.get(sheetInfo);
  let locationsArray = response.data.values.slice(2);

  locationsArray = locationsArray.reduce(function (result, row) {
    if (row.length > 1) {
      while (row.length < 11) {
        row.push('');
      }
      row = row.map(rowItem => rowItem.trim());
      result.push(row);
    }
    return result;
  }, []);

  // Save locations to mongoDB
  let index = 1;

  await asyncForEach(locationsArray, async function (locationRow) {
    const location = {};

    location.name = locationRow[0];
    location.architects = locationRow[1].split(',').map(architect => architect.trim()).join(', ');
    location.constructionDate = locationRow[2];
    location.demolitionDate = locationRow[3];
    let locationType = await LocationType.findOne({ 'name.ru': { $regex: locationRow[4], $options: 'i' } });

    if (locationType) {
      location.locationTypesId = [];
      location.locationTypesId.push(locationType._id);
    } else {
      locationType = new LocationType({ 'name.ru': locationRow[4] });
      locationType = await locationType.save();
      location.locationTypesId = [];
      location.locationTypesId.push(locationType._id);
      console.log(`LocationType ${locationType.name} was saved!`);
      locationType = null;
    }
    location.description = locationRow[5];
    location.wikiLink = locationRow[6].replace(/\(.*/, ''); // Remove part after '(...'
    location.coordinateX = locationRow[7];
    location.coordinateY = locationRow[8];
    location.photoLinks = locationRow[9].split(',').map(link => link.trim()).join('\n'); // Remove spaces
    location.mainPhotoLink = locationRow[10].replace(/\(.*/, ''); // Remove part after '(...'
    location.addressesId = [];
    const newLocation = new Location(location);

    await newLocation.save();
    console.log(`Location #${index++} was saved!`);
  });
}

/**
 * Get relationTypes's data from gSheets
 * @param cl
 * @returns {Promise<void>}
 */
async function importRelationTypes(cl) {
  const gsApi = google.sheets({ version: 'v4', auth: cl });

  // Get array of relation types
  let sheetInfo = {
    spreadsheetId: '1ixL6QPibf6jg3EUPwNoigvN2V1bqOvv4eAQpU74_ros',
    range: '\'Тип Связи\''
  };

  let response = await gsApi.spreadsheets.values.get(sheetInfo);
  const relationTypesArray = response.data.values.slice(2);

  // Get array of synonyms
  sheetInfo = {
    spreadsheetId: '1ixL6QPibf6jg3EUPwNoigvN2V1bqOvv4eAQpU74_ros',
    range: '\'Синонимы\''
  };

  response = await gsApi.spreadsheets.values.get(sheetInfo);
  const synonymsArray = response.data.values.slice(2);

  // Save relationTypes to mongoDB
  let index = 1;

  await asyncForEach(relationTypesArray, async function (relationRow) {
    const relationType = {};

    relationType.name = relationRow[0].trim();
    relationType.synonyms = [];
    synonymsArray.map((synonymRow) => {
      if (relationRow[0].trim() === synonymRow[0].trim()) {
        relationType.synonyms.push({ 'name.ru': synonymRow[1].trim() });
      }
      return synonymRow;
    });
    const newRelationType = new RelationType(relationType);

    await newRelationType.save();
    console.log(`RelationType #${index++} was saved!`);
  });
}

/**
 * Get locationTypes's data from gSheets
 * @param cl
 * @returns {Promise<void>}
 */
async function importLocationTypes(cl) {
  const gsApi = google.sheets({ version: 'v4', auth: cl });

  // Get array of location types
  const sheetInfo = {
    spreadsheetId: '1ixL6QPibf6jg3EUPwNoigvN2V1bqOvv4eAQpU74_ros',
    range: '\'Тип Локации\''
  };

  const response = await gsApi.spreadsheets.values.get(sheetInfo);
  const locationTypesArray = response.data.values.slice(2);

  // Save locationTypes to mongoDB
  let index = 1;

  await asyncForEach(locationTypesArray, async function (locationRow) {
    const locationType = {};

    locationType.name = locationRow[0].trim();

    const newLocationType = new LocationType(locationType);

    await newLocationType.save();
    console.log(`LocationType #${index++} was saved!`);
  });
}

/**
 * Get relation's data from gSheets
 * @param cl
 * @returns {Promise<void>}
 */
async function importRelations(cl) {
  const gsApi = google.sheets({ version: 'v4', auth: cl });

  // Get array of location types
  const sheetInfo = {
    spreadsheetId: '1ixL6QPibf6jg3EUPwNoigvN2V1bqOvv4eAQpU74_ros',
    range: '\'Персона Локация Связь\'!A3:H152'
  };

  const response = await gsApi.spreadsheets.values.get(sheetInfo);
  let relationsArray = response.data.values;

  relationsArray = relationsArray.reduce(function (result, row) {
    if (row.length > 1) {
      while (row.length < 8) {
        row.push('');
      }
      row = row.map(rowItem => rowItem.trim());
      result.push(row);
    }
    return result;
  }, []);

  // Save relations to mongoDB
  let index = 1;

  await asyncForEach(relationsArray, async function (relationRow) {
    const relation = {};

    relation.quote = relationRow[7];
    let person = await Person.findOne({ 'lastName.ru': { $regex: relationRow[2], $options: 'i' }, 'firstName.ru': { $regex: relationRow[3], $options: 'i' }, 'patronymic.ru': { $regex: relationRow[4], $options: 'i' } });

    if (person) {
      relation.personId = person._id;
    } else {
      person = new Person({ 'lastName.ru': relationRow[2], 'firstName.ru': relationRow[3], 'patronymic.ru': relationRow[4] });

      person = await person.save();
      relation.personId = person._id;
      console.log(`Person ${person.lastName} was saved!`);

      person = null;
    }
    let location = await Location.findOne({ 'name.ru': { $regex: relationRow[0], $options: 'i' } });

    if (location) {
      relation.locationId = location._id;
    } else {
      location = new Location({ 'name.ru': relationRow[0] });

      location = await location.save();
      relation.locationId = location._id;
      console.log(`Location ${location.name} was saved!`);

      location = null;
    }
    let relationType = await RelationType.findOne({ 'name.ru': { $regex: relationRow[1], $options: 'i' } });

    if (relationType) {
      relation.relationId = relationType._id;
    } else {
      relationType = new RelationType({ 'name.ru': relationRow[1] });
      relationType = await relationType.save();
      relation.relationId = relationType._id;
      console.log(`RelationType ${relationType.name} was saved!`);
      relationType = null;
    }
    const newRelation = new Relation(relation);

    await newRelation.save();
    console.log(`Relation #${index++} was saved!`);
  });
}
