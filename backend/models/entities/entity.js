const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entitySchema = new Schema({
  name: String
});

module.exports = mongoose.model('entities', entitySchema);
