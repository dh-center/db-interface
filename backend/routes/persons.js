const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.get('/persons', async (req, res) => {
  const dbQuery = req.query.name ? { name: { $regex: new RegExp(`${req.query.name}`, 'i') } } : {};

  try {
    const data = await Person.find(dbQuery);

    res.json({ payload: data });
  } catch (error) {
    res.json({ error });
  }
});

router.post('/persons', async (req, res) => {
  const newPerson = new Person(req.body);

  await newPerson.save();
  res.sendStatus(201);
});

module.exports = router;
