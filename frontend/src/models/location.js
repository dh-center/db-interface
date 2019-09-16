import {
  defineStandardProperties,
  defineMultilingualProperties
} from '../utils';
import BaseModel from './base';
import LocationTypeModel from './locationTypes';

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

    if (typeof this.data.locationTypeId !== 'string') {
      this.locationType = new LocationTypeModel(this.data.locationTypeId);
    }

    defineMultilingualProperties(this, this.data, [
      'name',
      'architects',
      'description'
    ]);

    defineStandardProperties(this, this.data, [
      'constructionDate',
      'demolitionDate',
      'locationTypeId',
      'addressesId',
      'wikiLink',
      'photoLinks',
      'mainPhotoLink',
      'coordinateX',
      'coordinateY'
    ]);
  }

  /**
   * Inserts new address to the end of list
   */
  insertNewAddress() {
    this.data.addressesId.push('');
  }

  /**
   * Delete address
   * @param {Address} address - address to delete
   */
  deleteAddress(address) {
    const index = this.data.addressesId.findIndex(_addressId => address === _addressId);

    this.data.addressesId.splice(index, 1);
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
    return ['name', 'architects', 'constructionDate', 'demolitionDate', 'locationTypeName', 'description'];
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
    return this.name.toLowerCase().includes(searchString.toLowerCase());
  }

  /**
   * Location name to display in the table
   * @returns {String}
   */
  get locationTypeName() {
    return this.locationType && this.locationType.name;
  }
}
