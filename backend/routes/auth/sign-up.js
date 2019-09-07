const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const { UsernameDuplicationError } = require('../../errorTypes');

router.post('/sign-up', async (req, res) => {
  try {
    await User.create(req.body.username, req.body.password);

    res.sendStatus(200);
  } catch (error) {
    // Catch MongoDB duplication error
    if (error.name === 'MongoError' && error.code === 11000) {
      throw new UsernameDuplicationError();
    }
    throw error;
  }
});

module.exports = router;
