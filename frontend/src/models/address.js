import {
  defineStandardProperties,
  defineMultilingualProperties
} from '../utils';
import BaseModel from './base';

/**
 * Class representing address
 */
export default class Address extends BaseModel {
  /**
   * Address constructor
   * @param {Address} _addressData
   */
  constructor(_addressData) {
    super(_addressData);

    defineMultilingualProperties(this, this.data, [
      'street',
      'build'
    ]);

    defineStandardProperties(this, this.data, [
      'homeNumber',
      'housing',
      'link'
    ]);
  }

  /**
   * Return entity name
   * @return {String}
   */
  static get entityType() {
    return 'addresses';
  }

  /**
   * Return entity fields
   * @return {Array}
   */
  static get fields() {
    return ['street', 'homeNumber', 'housing', 'build'];
  }
}
