import store from '../store';
import cloneDeep from 'lodash.clonedeep';
import {
  getMultilingualString,
  getMultilingualDescriptor,
  getStandardDescriptor
} from '../utils';

/**
 * Class representing location
 */
export default class Location {
  /**
   * Location constructor
   * @param {Location} _locationData
   */
  constructor(_locationData) {
    const locationData = cloneDeep(_locationData);

    this.id = locationData._id;
    delete locationData._id;

    this.data = locationData;
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
   * Current language for Person data
   * @return {String}
   */
  get language() {
    return store.state.app.dataLanguage;
  }
}
