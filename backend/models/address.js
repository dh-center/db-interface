const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jsonpatch = require('fast-json-patch');

const addressSchema = new Schema({
  street: {
    type: String,
    intl: true
  },
  homeNumber: String,
  housing: String,
  build: {
    type: String,
    intl: true
  }
});

addressSchema.statics.getChangesList = async function (addressId, modifiedData) {
  const address = addressId ? await this.findById(addressId).lean() : {};

  delete address._id;
  delete address.__v;
  delete modifiedData._id;
  delete modifiedData.__v;

  return jsonpatch.compare(address, modifiedData);
};

module.exports = mongoose.model('addresses', addressSchema);
