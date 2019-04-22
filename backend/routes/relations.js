const express = require('express');
const router = express.Router();
const relations = require('../models/relationId.json');

router.get('/relations', async (req, res) => {
  try {
    res.json({ relations });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
