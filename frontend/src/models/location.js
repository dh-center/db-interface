import {
  defineStandardProperties,
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

    defineStandardProperties(this, this.data, [
      'constructionDate',
      'demolitionDate',
      'coordinateX',
      'coordinateY'
    ]);
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
    return this.name.includes(searchString);
  }
}
