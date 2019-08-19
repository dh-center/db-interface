const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const jsonpatch = require('fast-json-patch');
const Change = require('../models/change');
const mongoose = require('mongoose');

router.get('/persons', async (req, res) => {
  const dbQuery = req.query.name ? { name: { $regex: new RegExp(`${req.query.name}`, 'i') } } : {};

  try {
    const data = await Person.find(dbQuery);

    res.json({ payload: data });
  } catch (error) {
    res.json({ error });
  }
});

router.post('/persons', async (req, res) => {
  const change = new Change({
    entityType: 'persons',
    user: res.locals.user._id,
    changes: jsonpatch.compare({}, req.body)
  });
  const result = await change.save();

  res.status(201).json({ payload: result });
});

router.get('/persons/changes', async (req, res) => {
  const changes = await Change.find({ entityType: 'persons', approved: null }).populate('entity');

  res.json({ payload: changes });
});

router.get('/persons/changes/:changeId', async (req, res) => {
  const change = await Change.findById(req.params.changeId).populate('entity');

  return res.status(200).json({ payload: change });
});

router.put('/persons/changes/:changeId/approval', async (req, res) => {
  const change = await Change.findById(req.params.changeId).populate('entity');

  if (change.entity) {
    const updatedDocument = jsonpatch.applyPatch(JSON.parse(JSON.stringify(change.entity)), change.changes).newDocument;

    await Person.updateOne({ _id: mongoose.Types.ObjectId(change.entity._id) }, updatedDocument);

    // @todo make request to the api for updating item

    change.approved = true;
    await change.save();
  } else {
    const person = new Person(jsonpatch.applyPatch({}, change.changes).newDocument);

    change.approved = true;
    // @todo make request to the api for creating item

    await Promise.all([person.save(), change.save()]);
  }
  res.sendStatus(200);
});
router.put('/persons/changes/:changeId/', async (req, res) => {
  await Change.updateOne(
    { _id: req.params.changeId },
    {
      changes: jsonpatch.compare({}, req.body)
    });

  res.status(200);
});

router.put('/persons/:personId', async (req, res) => {
  const person = await Person.findById(req.params.personId);

  const clearedPersonData = JSON.parse(JSON.stringify(person));

  const changes = jsonpatch.compare(clearedPersonData, req.body);

  const change = new Change({
    entityType: 'persons',
    user: res.locals.user._id,
    entity: req.params.personId,
    changes
  });

  await change.save();
  res.sendStatus(201);
});

router.get('/persons/:personId', async (req, res) => {
  const person = await Person.findById(req.params.personId).lean();

  if (req.query.withChanges) {
    const change = await Change.findOne({ entityType: 'persons', approved: null, entity: person._id }).lean();

    if (change) {
      person.changes = change;
    }
  }
  console.log(person);
  res.json({ payload: person });
});

module.exports = router;
