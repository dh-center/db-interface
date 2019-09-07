const express = require('express');
const router = express.Router();
const Location = require('../models/location');
const Change = require('../models/change');

router.get('/locations', async (req, res) => {
  const dbQuery = req.query.name ? { name: { $regex: new RegExp(`${req.query.name}`, 'i') } } : {};

  try {
    const data = await Location.find(dbQuery);

    res.json({ payload: data });
  } catch (error) {
    res.json({ error });
  }
});

router.get('/locations/:locationId', async (req, res) => {
  const location = await Location.findById(req.params.locationId).lean();

  if (req.query.withLastChanges) {
    const change = await Change.findOne({ entityType: 'locations', approved: null, entity: location._id }).lean();

    if (change) {
      location.lastChangesRecord = change;
    }
  }
  res.json({ payload: location });
});

module.exports = router;
