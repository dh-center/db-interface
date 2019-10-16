import {
  defineStandardProperties,
  defineMultilingualProperties
} from '../utils';
import BaseModel from './base';

/**
 * Class representing address
 */
export default class Routes extends BaseModel {
  /**
   * Address constructor
   * @param {Address} routeData
   */
  constructor(routeData) {
    super(routeData);

    defineMultilingualProperties(this, this.data, [
      'name',
      'description'
    ]);

    defineStandardProperties(this, this.data, [
      'photoLink',
      {
        name: 'locationIds',
        default: []
      }
    ]);
  }

  /**
   * Return entity name
   * @return {String}
   */
  static get entityType() {
    return 'routes';
  }

  /**
   * Return entity fields
   * @return {Array}
   */
  static get fields() {
    return ['name', 'description'];
  }

  /**
   * Delete address
   * @param {Address} address - address to delete
   */
  deleteLocation(address) {
    const index = this.data.locationIds.findIndex(_addressId => address === _addressId);

    this.data.locationIds.splice(index, 1);
  }

  /**
   * Inserts new locationType to the end of list
   */
  insertNewLocation() {
    this.data.locationIds.push(null);
  }
}
