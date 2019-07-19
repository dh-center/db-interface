const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.get('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.query.username });

    if (!user) return res.json({ error: 'No user with such email' });

    const compareResult = await user.comparePassword(req.query.password);

    if (compareResult) {
      res.sendStatus(200);
    } else {
      res.json({ error: 'Wrong password' });
    }
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
