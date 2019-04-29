const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.get('/persons', async (req, res) => {
  try {
    const data = await Person.find({ 'name': { $regex: new RegExp(req.query.name.slice(15), 'i') } });

    res.json({ data });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
