const express = require('express');
const router = express.Router();
const Relation = require('../models/relation');

router.post('/relations', async (req, res) => {
  try {
    await Relation.update({ locationId: req.body.locationId,
      relationId: req.body.relationId,
      personId: req.body.personId },
    { $push: { quote: req.body.quote } },
    { upsert: true });
    res.sendStatus(200);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
