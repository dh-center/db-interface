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
    importPersons(client);
  }
});

/**
 * Get data from gSheets
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
      while (row.length < 10) {
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
  process.exit();
}
