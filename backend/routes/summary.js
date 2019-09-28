const axios = require('axios');
const Change = require('../models/change');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async function (req, res) {
  /**
   * List of users to watch them
   */
  const users = [
    ['5d84dbb7ff41d87b293b330e', 'SPB_Art18'],
    ['5d84e6acff41d813a93b3311', 'SPB_Art19'],
    ['5d84e6c4ff41d8f0c93b3312', 'SPB_Art20'],
    ['5d84e6d4ff41d81a5b3b3313', 'SPB_His19'],
    ['5d84e6e4ff41d866003b3314', 'SPB_His20'],
    ['5d84e6f0ff41d8bd023b3315', 'SPB_Lit20']
  ];

  const usersMap = new Map(users);
  const entitiesToWatch = ['locations', 'persons', 'relations'];

  const usersResults = await Promise.all(Array.from(usersMap.keys()).map(async userId => {
    const userResults = await Promise.all(entitiesToWatch.map(async entityType => {
      const newCount = await Change.find({
        user: ObjectId(userId),
        entityType,
        isCreated: true,
        deleted: {
          $ne: true
        }
      }).countDocuments();

      const editedCount = await Change.find({
        user: ObjectId(userId),
        entityType,
        isCreated: null,
        deleted: {
          $ne: true
        }
      }).countDocuments();

      return {
        entityType,
        newCount,
        editedCount
      };
    }));

    return {
      user: usersMap.get(userId),
      values: userResults
    };
  }));

  usersResults.sort((record1, record2) => calculateScore(record2) - calculateScore(record1));

  const fullNotification = usersResults.map((record, index) => {
    const medals = ['🥇', '🥈', '🥉'];
    let message = `<b>${record.user}</b>${medals[index] || ''}\n`;

    record.values.forEach(value => {
      message += `\t\t\t${value.newCount} new ${value.entityType} and ${value.editedCount} edited\n`;
    });

    return message;
  }).join('\n');

  await axios({
    method: 'post',
    url: process.env.NOTIFY_URL,
    data: 'message=' + '<b>Summary</b>\n' + fullNotification + '&parse_mode=HTML'
  });
  res.sendStatus(200);
};

/**
 * Calculate user score for sorting
 * @param {object} record
 * @returns {number}
 */
function calculateScore(record) {
  let newCount = 0;
  let editedCount = 0;

  record.values.forEach(value => {
    newCount += value.newCount;
    editedCount += value.editedCount;
  });

  return newCount + 0.5 * editedCount;
}
