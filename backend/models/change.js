const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changeSchema = new Schema({
  entityType: {
    required: true,
    type: String
  },
  approved: Schema.Types.Boolean,
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  entity: {
    type: Schema.Types.ObjectId,
    refPath: 'entityType'
  },
  changeList: {
    required: true,
    type: Schema.Types.Mixed
  }
});

module.exports = mongoose.model('changes', changeSchema);
