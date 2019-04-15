const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
  title: String,
  content: String
});

module.exports = mongoose.model('texts', textSchema);
