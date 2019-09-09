import {
  getMultilingualString,
  getMultilingualDescriptor, getStandardDescriptor
} from '../utils';
import BaseModel from './base';

/**
 * Class representing relationType
 */
export default class RelationType extends BaseModel {
  /**
   * Person constructor
   * @param {Person} _relationTypeData
   */
  constructor(_relationTypeData) {
    super(_relationTypeData);

    this.data.name = this.data.name || getMultilingualString();

    Object.defineProperty(this, 'name', getMultilingualDescriptor('name'));
    Object.defineProperty(this, 'synonyms', getStandardDescriptor('synonyms'));
  }

  insertNewSynonym() {
    this.data.synonyms.push({name: getMultilingualString()});
  }

  /**
   * Return entity name
   * @return {String}
   */
  static get entityType() {
    return 'relationTypes';
  }

  /**
   * Return entity fields
   * @return {Array}
   */
  static get fields() {
    return [ 'name' ];
  }
}
