const express = require('express');
const router = express.Router();
const Relation = require('../models/relation');

router.post('/relations', async (req, res) => {
  try {
    const relation = await Relation.findOne({ locationId: req.body.locationId, relationId: req.body.relationId, personId: req.body.personId, quote: req.body.quote });

    if (relation) await Relation.updateOne({ __id: relation.__id }, { $inc: { __v: 1 } });
    else {
      const newRelation = new Relation({
        locationId: req.body.locationId,
        relationId: req.body.relationId,
        personId: req.body.personId,
        quote: req.body.quote
      });

      await newRelation.save();
    }
    res.sendStatus(200);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
