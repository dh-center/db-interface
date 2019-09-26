const notifier = require('../bin/notifier');

module.exports = async function (req, res) {
  await notifier();
  res.sendStatus(200);
};
