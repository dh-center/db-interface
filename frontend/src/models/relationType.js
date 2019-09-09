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

  insertNewSynonym() {
    this.data.synonyms.push(new RelationTypeSynonym());
  }

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

class RelationTypeSynonym extends BaseModel {
  constructor(_synonymData) {
    super(_synonymData);

    defineMultilingualProperties(this, this.data, [
      'name'
    ]);
  }

  toJSON() {
    return this.data;
  }
}
