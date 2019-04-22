const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const relationSchema = new Schema({
  locationId: ObjectId,
  relationId: Number,
  personId: ObjectId,
  quote: String
});

module.exports = mongoose.model('relations', relationSchema);
