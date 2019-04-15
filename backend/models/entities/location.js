const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: String,
  adress: String,
  constructionDate: Date,
  demolitionDate: Date,
  buildingType: String,
  description: String,
  source: String,
  image: String
});

module.exports = mongoose.model('locations', locationSchema);
