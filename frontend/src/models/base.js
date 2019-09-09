import store from '../store';
import cloneDeep from 'lodash.clonedeep';
import {
  getMultilingualString,
  getMultilingualDescriptor,
  getStandardDescriptor
} from '../utils';

/**
 * Base model class
 * @abstract
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
   * Current language for entity data
   * @return {String}
   */
  get language() {
    return store.state.app.dataLanguage;
  }

  /**
   * Return entity name
   * @abstract
   * @return {String}
   */
  static get entityType() {
    throw new Error('entity type is not defined');
  }

  /**
   * Return entity fields
   * @abstract
   * @return {Array}
   */
  static get fields() {
    throw new Error('fields are not defined');
  }
}
