const express = require('express');
const router = express.Router();
const Relation = require('../models/relation');

router.post('/relations', async (req, res) => {
  try {
    const conditions = {
      locationId: req.body.locationId,
      relationId: req.body.relationId,
      personId: req.body.personId
    };
    const doc = {
      $push: { quote: req.body.quote },
      $inc: { __v: 1 }
    };
    const options = { upsert: true };

    await Relation.updateOne(conditions, doc, options);

    res.sendStatus(200);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
