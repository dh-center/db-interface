import {
  defineStandardProperties,
  defineMultilingualProperties
} from '../utils';
import BaseModel from './base';
import PersonModel from './person';
import LocationModel from './location';
import RelationTypeModel from './relationType';

/**
 * Class representing person
 */
export default class Relation extends BaseModel {
  /**
   * Person constructor
   * @param {Person} _relationData
   */
  constructor(_relationData) {
    super(_relationData);

    this.person = new PersonModel(this.data.personId);
    this.location = new LocationModel(this.data.locationId);
    this.relation = new RelationTypeModel(this.data.relationId);

    defineMultilingualProperties(this, this.data, [
      'quote'
    ]);

    defineStandardProperties(this, this.data, [
      'personId',
      'locationId',
      'relationId'
    ]);
  }

  /**
   * Return entity name
   * @return {String}
   */
  static get entityType() {
    return 'relations';
  }

  /**
   * Return entity fields
   * @return {Array}
   */
  static get fields() {
    return ['personName', 'relationName', 'locationName'];
  }

  /**
   * Person name to display
   * @returns {string}
   */
  get personName() {
    return this.person.searchName;
  }

  /**
   * Location name to display
   * @returns {string}
   */
  get locationName() {
    return this.location.searchName;
  }

  /**
   * Relation type name to display
   * @returns {string}
   */
  get relationName() {
    return this.relation.name;
  }
}
