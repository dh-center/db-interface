const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/sign-up', async (req, res) => {
  try {
    const newUser = await User.create(req.body.username, req.body.password);

    res.sendStatus(200);
  } catch (error) {
    res.status(409).json({ error: error.toString() });
  }
});

module.exports = router;
