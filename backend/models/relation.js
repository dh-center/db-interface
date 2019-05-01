const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const relationSchema = new Schema({
  locationId: ObjectId,
  relationId: Number,
  personId: ObjectId,
  quote: [ String ]
});

relationSchema.pre('update', function (next) {
  this.update({},
    { $inc: { __v: 1 } },
    next);
});

module.exports = mongoose.model('relations', relationSchema);
