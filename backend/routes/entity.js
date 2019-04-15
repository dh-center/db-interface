const express = require('express');
const router = express.Router();
const Entity = require('../models/entities/entity');

router.post('/entity', async (req, res) => {
  try {
    const newEntity = new Entity({
      name: req.body.name
    });

    await newEntity.save();
    res.sendStatus(200);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
