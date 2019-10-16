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

  /**
   * Return full address
   * @return {String}
   */
  get name() {
    return `${this.street} ${this.homeNumber} ${this.housing} ${this.build}`;
  }

  /**
   * String to display on select component
   * @return {string}
   */
  get searchName() {
    return this.name;
  }

  /**
   * Returns true if search string satisfies the entity
   * @param {String} searchString
   * @return {boolean}
   */
  search(searchString) {
    return this.name.toLowerCase().includes(searchString.toLowerCase());
  }
}
