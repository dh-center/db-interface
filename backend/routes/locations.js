const express = require('express');
const router = express.Router();
const Location = require('../models/location');

router.get('/locations', async (req, res) => {
  const dbQuery = req.query.name ? { name: { $regex: new RegExp(`${req.query.name}`, 'i') } } : {};

  try {
    const data = await Location.find(dbQuery);

    res.json({ payload: data });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
