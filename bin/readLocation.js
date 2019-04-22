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

locations.forEach(async (item) => {
  const promises = [];

  promises.push(new Location({
    name: item.name
  }).save());

  await Promise.all(promises);
  process.exit();
});
