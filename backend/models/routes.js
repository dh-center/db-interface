const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getChangesListPlugin = require('./getChangesListPlugin');

const routeSchema = new Schema({
  name: {
    type: String,
    intl: true
  },
  description: {
    type: String,
    intl: true
  },
  locationIds: [ {
    type: Schema.Types.ObjectId,
    ref: 'locations'
  } ],
  travelTime: Number
});

/**
 * Get all persons without description
 * @param {Object} query - mongodb query
 * @returns {Object}
 */
// routeSchema.statics.fetchAll = function (query) {
//   return this.find(query)
//     .select('-description');
// };

routeSchema.plugin(getChangesListPlugin);

module.exports = mongoose.model('routes', routeSchema);
