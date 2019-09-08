const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jsonpatch = require('fast-json-patch');

const relationTypeSchema = new Schema({
  sqlId: Number,
  name: {
    type: String,
    required: true,
    intl: true
  }
});

relationTypeSchema.statics.getChangesList = async function (locationId, modifiedData) {
  const location = locationId ? await this.findById(locationId).lean() : {};

  delete location._id;
  delete location.__v;
  delete modifiedData._id;
  delete modifiedData.__v;

  return jsonpatch.compare(location, modifiedData);
};


module.exports = mongoose.model('relationTypes', relationTypeSchema);
