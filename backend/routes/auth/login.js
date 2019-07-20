const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.get('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.query.username });

    if (!user) return res.json({ error: 'No user with such username' });

    const compareResult = await user.comparePassword(req.query.password);

    if (compareResult) {
      res.json({ accessToken: user._id });
    } else {
      res.json({ error: 'Wrong password' });
    }
  } catch (error) {
    res.json({ error: error.toString() });
  }
});

module.exports = router;
