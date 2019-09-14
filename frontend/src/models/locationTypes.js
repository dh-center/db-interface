import { defineMultilingualProperties } from '../utils';
import BaseModel from './base';

/**
 * Class representing locationType
 */
export default class LocationType extends BaseModel {
  /**
   * Person constructor
   * @param {Person} _locationTypeData
   */
  constructor(_locationTypeData) {
    super(_locationTypeData);

    defineMultilingualProperties(this, this.data, [
      'name'
    ]);
  }

  /**
   * Return entity name
   * @return {String}
   */
  static get entityType() {
    return 'locationTypes';
  }

  /**
   * Return entity fields
   * @return {Array}
   */
  static get fields() {
    return [ 'name' ];
  }
}
