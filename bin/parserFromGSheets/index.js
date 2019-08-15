const schema = require('./schema');
const { google } = require('googleapis');
const credentials = require('./credentials');
const path = require('path');

/**
 * Read environment settings
 */
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Setup DB
 */
require('../../backend/modules/db');

const Person = require('../../backend/models/person');

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
    getData(client);
  }
});

/**
 * Get data from gSheets
 * @param cl
 * @returns {Promise<void>}
 */
async function getData(cl) {
  const gsApi = google.sheets({ version: 'v4', auth: cl });
  const sheetInfo = {
    spreadsheetId: '1ixL6QPibf6jg3EUPwNoigvN2V1bqOvv4eAQpU74_ros',
    ranges: ['\'Персоны\'!A3:H132', '\'Персоны\'!A134:H150', '\'Персоны\'!A152:H185']
  };

  const response = await gsApi.spreadsheets.values.batchGet(sheetInfo);
  const dataArrayRanges = response.data.valueRanges;
  let dataArray = dataArrayRanges[0].values.concat(dataArrayRanges[1].values).concat(dataArrayRanges[2].values);

  dataArray = dataArray.map(function (r) {
    while (r.length < 8) {
      r.push('');
    }
    return r;
  });

  dataArray.forEach(function (row) {
    const personData = {};

    for (const field in schema) {
      personData[field] = {
        en: '',
        ru: ''
      };
    }
    personData.firstName.ru = row[0].trim();
    personData.lastName.ru = row[1].trim();
    personData.patronymic.ru = row[2].trim();
    personData.pseudonym.ru = row[3].trim();
    personData.birthDate = getDateObject(row[4]);
    personData.deathDate = getDateObject(row[5]);
    personData.profession.ru = row[6].trim();
    personData.description.ru = row[7].trim();
    const newPerson = new Person(personData);

    newPerson.save();
  });
  process.exit();
}

/**
 * Get Date() object from string
 * @param dateStr
 * @returns {*}
 */
function getDateObject(dateStr) {
  if (!dateStr) {
    return;
  }
  const [day, month, year] = dateStr.split('.');

  return new Date(`${year}-${month}-${day}`);
}
