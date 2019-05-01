const express = require('express');
const router = express.Router();
const Relation = require('../models/relation');

router.post('/relations', async (req, res) => {
  try {
    const relation = await Relation.findOne({ locationId: req.body.locationId, relationId: req.body.relationId, personId: req.body.personId, quote: req.body.quote });

    console.log(relation);
    if (relation) await relation.updateOne({ $inc: { __v: 1 } });
    else {
      const newRelation = new Relation({
        locationId: req.body.locationId,
        relationId: req.body.relationId,
        personId: req.body.personId,
        quote: req.body.quote
      });

      console.log(newRelation);
      await newRelation.save();
    }
    console.log(relation);
    res.sendStatus(200);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
