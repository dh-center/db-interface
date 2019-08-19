const express = require('express');
const router = express.Router();
const Change = require('../models/change');
const jsonpatch = require('fast-json-patch');
const Person = require('../models/person');
const mongoose = require('mongoose');

router.get('/changes/persons', async (req, res) => {
  const changes = await Change
    .find({ entityType: 'persons', approved: null })
    .populate('entity')
    .lean();

  res.json({ payload: changes });
});

router.get('changes/persons/:changesRecordId', async (req, res) => {
  const change = await Change
    .findById(req.params.changeId)
    .populate('entity');

  return res.status(200).json({ payload: change });
});

// create new change record for existing or non-existing person
router.post('/changes/persons/:personId?', async (req, res) => {
  let person = {};

  const personId = req.params.personId;

  if (personId) {
    person = await Person.findById(personId).lean();
  }

  const change = new Change({
    entityType: 'persons',
    user: res.locals.user._id,
    ...(personId && { entity: personId }),
    changes: jsonpatch.compare(person, req.body)
  });
  const result = await change.save();

  res.status(201).json({ payload: result });
});

router.patch('/changes/persons/:changesRecordId', async (req, res) => {
  await Change
    .updateOne({ _id: req.params.changesRecordId }, { changes: jsonpatch.compare({}, req.body) });

  res.status(200);
});

router.put('/changes/persons/:changeId/approval', async (req, res) => {
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

module.exports = router;
