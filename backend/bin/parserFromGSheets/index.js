const { google } = require('googleapis');
const credentials = require('./credentials');
const path = require('path');

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

const client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  [ 'https://www.googleapis.com/auth/spreadsheets.readonly' ]
);

client.authorize(function (error, tokens) {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected!');
    Promise.all([importPersons(client), importLocations(client), importRelationTypes(client)]).then(() => importAddresses(client)).then(() => process.exit());
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
  let dataArray = response.data.values.slice(2);

  dataArray = dataArray.reduce(function (result, row) {
    if (row.length > 1) {
      while (row.length < 13) {
        row.push('');
      }
      result.push(row);
    }
    return result;
  }, []);

  let index = 1;

  await Promise.all(dataArray.map(async function (row) {
    row = row.map(rowItem => rowItem.trim());

    const personData = {};

    personData.firstName = row[0];
    personData.lastName = row[1];
    personData.patronymic = row[2];
    personData.pseudonym = row[3];
    personData.birthDate = row[4];
    personData.deathDate = row[5];
    personData.profession = row[6];
    personData.description = row[7];
    const newPerson = new Person(personData);

    await newPerson.save();
    console.log(`Person #${index++} was saved!`);
  }));
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

  await Promise.all(addressesArray.map(async function (addressRow) {
    const address = {
      street: addressRow[0],
      homeNumber: addressRow[1],
      housing: addressRow[2],
      build: addressRow[3]
    };

    const newAddress = new Address(address);

    await newAddress.save();
    console.log(`Address #${index++} was saved!`);
    await Location.updateMany({ name: { ru: addressRow[5] } }, { $push: { addressesId: newAddress._id } });
  }));
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

  await Promise.all(locationsArray.map(async function (locationRow) {
    const location = {};

    location.name = locationRow[0];
    location.architects = locationRow[1].split(',').map(architect => architect.trim()).join(', ');
    location.constructionDate = locationRow[2];
    location.demolitionDate = locationRow[3];
    location.buildingType = locationRow[4];
    location.description = locationRow[5];
    location.coordinateX = locationRow[7];
    location.coordinateY = locationRow[8];
    location.addressesId = [];
    const newLocation = new Location(location);

    await newLocation.save();
    console.log(`Location #${index++} was saved!`);
  }));
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

  await Promise.all(relationTypesArray.map(async function (relationRow) {
    const relationType = {};

    relationType.name = relationRow[0].trim();
    relationType.synonyms = [];
    synonymsArray.map((synonymRow) => {
      if (relationRow[0].trim() === synonymRow[0].trim()) {
        relationType.synonyms.push({ name: { ru: synonymRow[1].trim() } });
      }
      return synonymRow;
    });
    const newRelationType = new RelationType(relationType);

    await newRelationType.save();
    console.log(`RelationType #${index++} was saved!`);
  }));
}
