import store from '../store';
import cloneDeep from 'lodash.clonedeep';
import {
  getMultilingualString,
  getMultilingualDescriptor,
  getStandardDescriptor
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

    this.data.name = this.data.name || getMultilingualString();
    this.data.architects = this.data.architects || getMultilingualString();
    this.data.buildingType = this.data.buildingType || getMultilingualString();
    this.data.description = this.data.description || getMultilingualString();

    Object.defineProperty(this, 'name', getMultilingualDescriptor('name'));
    Object.defineProperty(this, 'architects', getMultilingualDescriptor('architects'));
    Object.defineProperty(this, 'constructionDate', getStandardDescriptor('constructionDate'));
    Object.defineProperty(this, 'demolitionDate', getStandardDescriptor('demolitionDate'));
    Object.defineProperty(this, 'buildingType', getMultilingualDescriptor('buildingType'));
    Object.defineProperty(this, 'description', getMultilingualDescriptor('description'));
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
