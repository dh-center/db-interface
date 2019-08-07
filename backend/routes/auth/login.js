const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const {
  NoUserWithSuchUsernameError,
  WrongUserPasswordError
} = require('../../errorTypes');

router.get('/login', async (req, res) => {
  const user = await User.findOne({ username: req.query.username });

  if (!user) throw new NoUserWithSuchUsernameError();

  const compareResult = await user.comparePassword(req.query.password);

  if (compareResult) {
    res.json({ accessToken: user.generateJWT() });
  } else {
    throw new WrongUserPasswordError();
  }
});

module.exports = router;
