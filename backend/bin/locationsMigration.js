const path = require('path');
const asyncForEach = require('./asyncForEach');

/**
 * Read environment settings
 */
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Setup DB
 */
require('../modules/db');

const Location = require('../models/location');

/**
 * Update Locations
 * @return {Promise<void>}
 */
async function main() {
  const locations = await Location.find({});

  await asyncForEach(locations, async function (location) {
    location.locationTypesId = [];
    location.locationTypesId.push(location.locationTypeId);
    await Location.updateOne({ 'name.ru': location.name }, { locationTypesId: location.locationTypesId, $unset: { locationTypeId: 1 } });
  });
  process.exit();
}

main();
