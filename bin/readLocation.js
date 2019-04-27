/**
 * Read json file (data/streets.json) with streets and insert them to DB
 * Usage: node readLocation.js
 */

const path = require('path');

/**
 * Read environment settings
 */
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/**
 * Setup DB
 */
require('../backend/modules/db');

const Location = require('../backend/models/location');

/**
 * Read data
 */
const locations = require('./data/streets.json');
const promises = [];

const dateConstruction = new Date(2000, 9, 10);
const dateDemolition = new Date(2156, 0, 1);

locations.forEach(async function (item) {
  promises.push(new Location({
    name: item.name,
    address: 'Адрес',
    constructionDate: dateConstruction,
    demolitionDate: dateDemolition,
    buildingType: 'Тип постройки',
    description: 'Описание'
  }).save());
});
Promise.all(promises).then(() => process.exit());
