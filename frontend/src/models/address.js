import store from '../store';
import cloneDeep from 'lodash.clonedeep';
import {
  getMultilingualString,
  getMultilingualDescriptor,
  getStandardDescriptor
} from '../utils';
import BaseModel from './base'

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

    this.data.street = this.data.street || getMultilingualString();
    this.data.build = this.data.build || getMultilingualString();

    Object.defineProperty(this, 'street', getMultilingualDescriptor('street'));
    Object.defineProperty(this, 'homeNumber', getStandardDescriptor('homeNumber'));
    Object.defineProperty(this, 'housing', getStandardDescriptor('housing'));
    Object.defineProperty(this, 'build', getMultilingualDescriptor('build'));
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
