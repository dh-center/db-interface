import {
  defineStandardProperties,
  defineMultilingualProperties
} from '../utils';
import BaseModel from './base';

/**
 * Class representing person
 */
export default class Person extends BaseModel {
  /**
   * Person constructor
   * @param {Person} _personData
   */
  constructor(_personData) {
    super(_personData);

    defineMultilingualProperties(this, this.data, [
      'firstName',
      'lastName',
      'patronymic',
      'pseudonym',
      'profession',
      'description'
    ]);

    defineStandardProperties(this, this.data, [
      'birthDate',
      'deathDate',
      'wikiLink',
      'photoLinks',
      'source',
      'mainPhotoLink'
    ]);
  }

  /**
   * Return entity name
   * @return {String}
   */
  static get entityType() {
    return 'persons';
  }

  /**
   * Return entity fields
   * @return {Array}
   */
  static get fields() {
    return ['lastName', 'firstName', 'patronymic', 'pseudonym', 'birthDate', 'deathDate', 'profession', 'description'];
  }

  /**
   * String to display on select component
   * @return {string}
   */
  get searchName() {
    return (this.lastName + ' ' + this.firstName + ' ' + this.patronymic).trim();
  }

  /**
   * Returns true if search string satisfies the entity
   * @param {String} searchString
   * @return {boolean}
   */
  search(searchString) {
    return this.searchName.toLowerCase().includes(searchString.toLowerCase());
  }
}
