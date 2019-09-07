const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jsonpatch = require('fast-json-patch');

const locationSchema = new Schema({
  name: {
    type: String,
    intl: true
  },
  addressesId: [ Schema.Types.ObjectId ],
  architects: {
    type: String,
    intl: true
  },
  constructionDate: String,
  demolitionDate: String,
  buildingType: {
    type: String,
    intl: true
  },
  description: {
    type: String,
    intl: true
  },
  coordinateX: Number,
  coordinateY: Number
});

locationSchema.statics.getChangesList = async function (locationId, modifiedData) {
  const location = locationId ? await this.findById(locationId).lean() : {};

  delete location._id;
  delete location.__v;
  delete modifiedData._id;
  delete modifiedData.__v;

  return jsonpatch.compare(location, modifiedData);
};

module.exports = mongoose.model('locations', locationSchema);
