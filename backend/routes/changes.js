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

router.get('/changes/persons/:changesRecordId', async (req, res) => {
  const change = await Change
    .findById(req.params.changesRecordId)
    .populate('entity');

  return res.status(200).json({ payload: change });
});

// create new change record for existing or non-existing person
router.post('/changes/persons/:personId?', async (req, res) => {
  const change = new Change({
    entityType: 'persons',
    user: res.locals.user._id,
    ...(req.params.personId && { entity: req.params.personId }),
    changes: await Person.getChangesList(req.params.personId, req.body)
  });
  const result = await change.save();

  res.status(201).json({ payload: result });
});

// Patch existing change record
router.patch('/changes/persons/:changesRecordId', async (req, res) => {
  const changeRecord = await Change.findById(req.params.changesRecordId);

  changeRecord.changes = await Person.getChangesList(changeRecord.entity, req.body);
  await changeRecord.save();
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
