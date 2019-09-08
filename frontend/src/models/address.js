import store from '../store';
import cloneDeep from 'lodash.clonedeep';
import {
  getMultilingualString,
  getMultilingualDescriptor,
  getStandardDescriptor
} from '../utils';

/**
 * Class representing address
 */
export default class Address {
  /**
   * Address constructor
   * @param {Address} _addressData
   */
  constructor(_addressData) {
    const addressData = cloneDeep(_addressData);

    this.id = addressData._id;
    delete addressData._id;

    this.data = addressData;
    this.data.street = this.data.street || getMultilingualString();
    this.data.build = this.data.build || getMultilingualString();

    Object.defineProperty(this, 'street', getMultilingualDescriptor('street'));
    Object.defineProperty(this, 'homeNumber', getStandardDescriptor('homeNumber'));
    Object.defineProperty(this, 'housing', getStandardDescriptor('housing'));
    Object.defineProperty(this, 'build', getMultilingualDescriptor('build'));
  }

  /**
   * Current language for Person data
   * @return {String}
   */
  get language() {
    return store.state.app.dataLanguage;
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
