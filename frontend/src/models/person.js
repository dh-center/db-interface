import store from '../store';
import cloneDeep from 'lodash.clonedeep';
import {
  getMultilingualString,
  getMultilingualDescriptor,
  getStandardDescriptor
} from '../utils';

/**
 * Class representing person
 */
export default class Person {
  /**
   * Person constructor
   * @param {Person} _personData
   */
  constructor(_personData) {
    const personData = cloneDeep(_personData);

    this.id = personData._id;
    delete personData._id;

    this.data = personData;
    this.data.firstName = this.data.firstName || getMultilingualString();
    this.data.lastName = this.data.lastName || getMultilingualString();
    this.data.patronymic = this.data.patronymic || getMultilingualString();
    this.data.description = this.data.description || getMultilingualString();

    Object.defineProperty(this, 'firstName', getMultilingualDescriptor('firstName'));
    Object.defineProperty(this, 'lastName', getMultilingualDescriptor('lastName'));
    Object.defineProperty(this, 'patronymic', getMultilingualDescriptor('patronymic'));
    Object.defineProperty(this, 'description', getMultilingualDescriptor('description'));
    Object.defineProperty(this, 'birthDate', getStandardDescriptor('birthDate'));
    Object.defineProperty(this, 'deathDate', getStandardDescriptor('deathDate'));
  }

  /**
   * Current language for Person data
   * @return {String}
   */
  get language() {
    return store.state.app.dataLanguage;
  }

  /**
   * Return entity name
   * @return {String}
   */
  static get entityType() {
    return 'persons';
  }
}
