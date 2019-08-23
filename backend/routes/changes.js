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
  const changeRecord = await Change
    .findById(req.params.changesRecordId)
    .populate('entity');

  return res.status(200).json({ payload: changeRecord });
});

// create new change record for existing or non-existing person
router.post('/changes/persons/:personId?', async (req, res) => {
  const changeRecord = new Change({
    entityType: 'persons',
    user: res.locals.user._id,
    ...(req.params.personId && { entity: req.params.personId }),
    changeList: await Person.getChangesList(req.params.personId, req.body)
  });
  const result = await changeRecord.save();

  res.status(201).json({ payload: result });
});

// Patch existing change record
router.patch('/changes/persons/:changesRecordId', async (req, res) => {
  const changeRecord = await Change.findById(req.params.changesRecordId);

  changeRecord.changeList = await Person.getChangesList(changeRecord.entity, req.body);
  await changeRecord.save();
  res.status(200);
});

// approve changelist
router.put('/changes/persons/:changeId/approval', async (req, res) => {
  const changeRecord = await Change.findById(req.params.changeId).populate('entity');

  if (changeRecord.entity) {
    const updatedDocument = jsonpatch.applyPatch(JSON.parse(JSON.stringify(changeRecord.entity)), changeRecord.changeList).newDocument;

    await Person.updateOne({ _id: mongoose.Types.ObjectId(changeRecord.entity._id) }, updatedDocument);

    // @todo make request to the api for updating item

    changeRecord.approved = true;
    await changeRecord.save();
  } else {
    const person = new Person(jsonpatch.applyPatch({}, changeRecord.changeList).newDocument);

    changeRecord.approved = true;
    // @todo make request to the api for creating item

    await Promise.all([person.save(), changeRecord.save()]);
  }
  res.sendStatus(200);
});

module.exports = router;
