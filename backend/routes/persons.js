const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const Change = require('../models/change');

router.get('/persons', async (req, res) => {
  const dbQuery = req.query.name ? { name: { $regex: new RegExp(`${req.query.name}`, 'i') } } : {};

  try {
    const data = await Person.find(dbQuery).lean();

    res.json({ payload: data });
  } catch (error) {
    res.json({ error });
  }
});

router.get('/persons/:personId', async (req, res) => {
  const person = await Person.findById(req.params.personId).lean();

  if (req.query.withLastChanges) {
    const change = await Change.findOne({ entityType: 'persons', approved: null, entity: person._id }).lean();

    if (change) {
      person.lastChangesRecord = change;
    }
  }
  res.json({ payload: person });
});

module.exports = router;
