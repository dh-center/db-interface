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
      'deathDate'
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
    return ['firstName', 'lastName', 'patronymic', 'pseudonym', 'birthDate', 'deathDate', 'profession', 'description'];
  }

  get searchName() {
    return (this.lastName + ' ' + this.firstName + ' ' + this.patronymic).trim();
  }

  search(searchQuery) {
    return this.searchName.includes(searchQuery);
  }
}
