import {
  getMultilingualString,
  getMultilingualDescriptor,
  getStandardDescriptor
} from '../utils';
import BaseModel from './base'

/**
 * Class representing person
 */
export default class Person extends BaseModel{
  /**
   * Person constructor
   * @param {Person} _personData
   */
  constructor(_personData) {
    super(_personData);

    this.data.firstName = this.data.firstName || getMultilingualString();
    this.data.lastName = this.data.lastName || getMultilingualString();
    this.data.patronymic = this.data.patronymic || getMultilingualString();
    this.data.pseudonym = this.data.pseudonym || getMultilingualString();
    this.data.profession = this.data.profession || getMultilingualString();
    this.data.description = this.data.description || getMultilingualString();

    Object.defineProperty(this, 'firstName', getMultilingualDescriptor('firstName'));
    Object.defineProperty(this, 'lastName', getMultilingualDescriptor('lastName'));
    Object.defineProperty(this, 'patronymic', getMultilingualDescriptor('patronymic'));
    Object.defineProperty(this, 'pseudonym', getMultilingualDescriptor('pseudonym'));
    Object.defineProperty(this, 'profession', getMultilingualDescriptor('profession'));
    Object.defineProperty(this, 'description', getMultilingualDescriptor('description'));
    Object.defineProperty(this, 'birthDate', getStandardDescriptor('birthDate'));
    Object.defineProperty(this, 'deathDate', getStandardDescriptor('deathDate'));
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
}
