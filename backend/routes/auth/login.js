const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.get('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.query.username });

    if (!user) return res.sendStatus(401);

    const compareResult = await user.comparePassword(req.query.password);

    if (compareResult) {
      res.json({ accessToken: user.generateJWT() });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(401).json({ error: error.toString() });
  }
});

module.exports = router;
