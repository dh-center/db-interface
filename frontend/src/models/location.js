import {
  getMultilingualString,
  getMultilingualDescriptor,
  getStandardDescriptor,
  defineMultilingualProperties
} from '../utils';
import BaseModel from './base';

/**
 * Class representing location
 */
export default class Location extends BaseModel {
  /**
   * Location constructor
   * @param {Location} _locationData
   */
  constructor(_locationData) {
    super(_locationData);

    defineMultilingualProperties(this, this.data, [
      'name',
      'architects',
      'buildingType',
      'description'
    ]);

    Object.defineProperty(this, 'constructionDate', getStandardDescriptor('constructionDate'));
    Object.defineProperty(this, 'demolitionDate', getStandardDescriptor('demolitionDate'));
    Object.defineProperty(this, 'coordinateX', getStandardDescriptor('coordinateX'));
    Object.defineProperty(this, 'coordinateY', getStandardDescriptor('coordinateY'));
  }

  /**
   * Return entity name
   * @return {String}
   */
  static get entityType() {
    return 'locations';
  }

  /**
   * Return entity fields
   * @return {Array}
   */
  static get fields() {
    return ['name', 'architects', 'constructionDate', 'demolitionDate', 'buildingType', 'description', 'coordinateX', 'coordinateY'];
  }
}
