/**
 * Generates random person names and insert them to DB
 * Usage: node generateRandomData.js
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
const fs = require('fs');
const data = 'bin/data/streets.json';
const str = fs.readFileSync(data, 'utf8');
const locations = JSON.parse(str);
const streets = [];

locations.forEach((item) => {
  streets[streets.length] = item.name;
});

(async function main() {
  const promises = [];

  for (let i = 0; i < streets.length; i++) {
    promises.push(new Location({
      name: streets[i]
    }).save());
  }

  await Promise.all(promises);
  process.exit();
})();
