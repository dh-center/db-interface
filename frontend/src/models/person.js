import Model from '../lib/model';
import schemaTypes from '../lib/schema/types';
import Schema from '../lib/schema';

/**
 * Class representing a person's data structure
 */
export default class Person extends Model {
  /**
   * Create Person model instance
   * @param {Object} personData - initial person data
   * @param {String} language - initial language for person's data
   */
  constructor(personData, language) {
    super(Person.schema);
    this.data = Person.schema.assign(personData);
    this.language = language;
  }

  /**
   * Persons schema
   * @return {Schema}
   */
  static get schema() {
    return new Schema({
      firstName: schemaTypes.MultilingualString,
      lastName: schemaTypes.MultilingualString,
      patronymic: schemaTypes.MultilingualString,
      description: schemaTypes.MultilingualString,
      profession: schemaTypes.MultilingualString,
      birthDate: schemaTypes.String,
      deathDate: schemaTypes.String
    });
  }

  /**
   * Returns full user name
   * @return {string}
   */
  get name() {
    const firstName = this.firstName;
    const lastName = this.lastName;
    const patronymic = this.patronymic;

    return `${firstName} ${lastName} ${patronymic}`.trim();
  }

  /**
   * Sets full user name
   * @param {String} value - new name
   */
  set name(value) {
    const [firstName, lastName, ...patronymic] = value.split(' ');

    this.firstName = firstName;
    this.lastName = lastName;
    this.patronymic = patronymic.join(' ');
  }
}
