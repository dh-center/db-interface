import {
  defineStandardProperties,
  defineMultilingualProperties
} from '../utils';
import BaseModel from './base';
import AddressModel from './address';

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
    this.data.addressesId.push(new AddressModel());
  }

  /**
   * Delete address
   * @param {Address} address - address to delete
   */
  deleteAddress(address) {
    const index = this.data.addressesId.findIndex(_addressId => address.id === _addressId);

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
    return ['name', 'architects', 'constructionDate', 'demolitionDate', 'locationTypeId', 'description', 'coordinateX', 'coordinateY'];
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
}
