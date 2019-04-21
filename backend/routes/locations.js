const express = require('express');
const router = express.Router();
const Location = require('../models/location');

router.get('/locations', async (req, res) => {
  try {
    const data = await Location.find({ 'name': { $regex: new RegExp(`${req.query.name}`, 'i') } });

    res.json({ data });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
