const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.post('/sign-up', async (req, res) => {
  try {
    const newUser = await User.create(req.body.email, req.body.password);
    const jwt = newUser.generateJWT();

    res.json({ jwt });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
