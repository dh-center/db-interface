const path = require('path');
const axios = require('axios');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('../modules/db');

const Change = require('../models/change');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Send notification with user stats to the Telegram
 * @returns {Promise<void>}
 */
async function main() {
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

  const result = await Promise.all(Array.from(usersMap.keys()).map(async userId => {
    const values = await Promise.all(entitiesToWatch.map(async entityType => {
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
      values
    };
  }));

  result.sort(sortUsers);

  const fullNotification = result.map((record, index) => {
    // language=HTML
    const medali = ['🥇', '🥈', '🥉'];
    let message = `<b>${record.user}</b>${medali[index] || ''}\n`;

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
}

// main().then(() => process.exit());

/**
 * User's sorting function
 * @param record1
 * @param record2
 * @returns {number}
 */
function sortUsers(record1, record2) {
  return calculateScore(record2) - calculateScore(record1);
}

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

module.exports = main;
