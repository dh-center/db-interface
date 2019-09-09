import {
  defineMultilingualProperties,
  defineStandardProperties
} from '../utils';
import BaseModel from './base';

/**
 * Class representing relationType
 */
export default class RelationType extends BaseModel {
  /**
   * Person constructor
   * @param {Person} _relationTypeData
   */
  constructor(_relationTypeData) {
    super(_relationTypeData);

    defineMultilingualProperties(this, this.data, [
      'name'
    ]);

    this.data.synonyms = this.data.synonyms || [];
    this.data.synonyms = this.data.synonyms.map(synonym => new RelationTypeSynonym(synonym));

    defineStandardProperties(this, this.data, [
      'synonyms'
    ]);
  }

  /**
   * Inserts new synonym to the end of list
   */
  insertNewSynonym() {
    this.data.synonyms.push(new RelationTypeSynonym());
  }

  /**
   * Delete relation type synonym
   * @param {RelationTypeSynonym} synonym - synonym to delete
   */
  deleteSynonym(synonym) {
    const index = this.data.synonyms.findIndex(_synonym => synonym === _synonym);

    this.data.synonyms.splice(index, 1);
  }

  /**
   * Return entity name
   * @return {String}
   */
  static get entityType() {
    return 'relationTypes';
  }

  /**
   * Return entity fields
   * @return {Array}
   */
  static get fields() {
    return [ 'name' ];
  }
}

/**
 * Class representing relation type synonym
 */
class RelationTypeSynonym extends BaseModel {
  /**
   * Creates new instance with specified data
   * @param {Object} [_synonymData] - synonym data
   */
  constructor(_synonymData) {
    super(_synonymData);

    defineMultilingualProperties(this, this.data, [
      'name'
    ]);
  }

  /**
   * Standard method for JSON serialization
   * @override
   * @return {Object}
   */
  toJSON() {
    return this.data;
  }
}
