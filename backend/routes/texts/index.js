const express = require('express');
const router = express.Router();
const Text = require('../../models/text');
const mongoose = require('mongoose');

router.get('/texts', async (req, res) => {
  try {
    const data = await Text.find();

    res.json({ data });
  } catch (error) {
    res.json({ error });
  }
});

router.get('/texts/:textId', async (req, res) => {
  try {
    const text = await Text.findById(req.params.textId);

    if (!text) return res.json({ error: 'No text with such textID' });

    res.json({ data: text });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.json({ error: 'Invalid id' });
    }
    res.json({ error });
  }
});

router.post('/texts', async (req, res) => {
  try {
    const newText = new Text({
      title: req.body.title,
      content: req.body.content
    });

    await newText.save();
    res.sendStatus(200);
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
