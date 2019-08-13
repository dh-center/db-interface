const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changeSchema = new Schema({
  entityType: {
    required: true,
    type: String
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId
  },
  entity: Schema.Types.ObjectId,
  changes: {
    required: true,
    type: Schema.Types.Mixed
  }
});

module.exports = mongoose.model('changes', changeSchema);
