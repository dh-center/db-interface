import {
  defineStandardProperties,
  defineMultilingualProperties
} from '../utils';
import BaseModel from './base';

/**
 * Class representing person
 */
export default class Relation extends BaseModel {
  /**
   * Person constructor
   * @param {Person} _relationData
   */
  constructor(_relationData) {
    super(_relationData);

    defineMultilingualProperties(this, this.data, [
      'quote'
    ]);

    defineStandardProperties(this, this.data, [
      'personId',
      'locationId',
      'relationId'
    ]);
  }

  /**
   * Return entity name
   * @return {String}
   */
  static get entityType() {
    return 'relations';
  }

  /**
   * Return entity fields
   * @return {Array}
   */
  static get fields() {
    return [ 'id' ];
  }
}
