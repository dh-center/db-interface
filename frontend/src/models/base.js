import store from '../store';
import cloneDeep from 'lodash.clonedeep';
import {
  getMultilingualString,
  getMultilingualDescriptor,
  getStandardDescriptor
} from '../utils';

/**
 * Base model class
 */
export default class Base {
  /**
   * Model constructor
   * @param {Object} _entityData
   */
  constructor(_entityData) {
    const entityData = cloneDeep(_entityData);

    this.id = entityData._id;
    delete entityData._id;

    this.data = entityData;
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
    throw new Error('entity type is not defined');
  }

  /**
   * Return entity fields
   * @return {Array}
   */
  static get fields() {
    throw new Error('fields are not defined');
  }
}
