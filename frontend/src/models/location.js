import Model from '../lib/model';
import schemaTypes from '../lib/schema/types';
import Schema from '../lib/schema';

/**
 * Class representing a location's data structure
 */
export default class Location extends Model {
  /**
   * Create Location model instance
   * @param {Object} locationData - initial location data
   * @param {String} language - initial language for location's data
   */
  constructor(locationData, language) {
    super(Location.schema);
    this.data = Location.schema.assign(locationData);
    this.language = language;
  }

  /**
   * Location's schema
   * @return {Schema}
   */
  static get schema() {
    return new Schema({});
  }
}
