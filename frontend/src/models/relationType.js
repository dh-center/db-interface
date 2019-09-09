import store from '../store';
import cloneDeep from 'lodash.clonedeep';
import {
  getMultilingualString,
  getMultilingualDescriptor, getStandardDescriptor
} from '../utils';

/**
 * Class representing person
 */
export default class RelationType {
  /**
   * Person constructor
   * @param {Person} _relationTypeData
   */
  constructor(_relationTypeData) {
    const relationTypeData = cloneDeep(_relationTypeData);

    this.id = relationTypeData._id;
    delete relationTypeData._id;

    this.data = relationTypeData;
    this.data.name = this.data.name || getMultilingualString();

    Object.defineProperty(this, 'name', getMultilingualDescriptor('name'));
    Object.defineProperty(this, 'synonyms', getStandardDescriptor('synonyms'));
  }

  insertNewSynonym() {
    this.data.synonyms.push({name: getMultilingualString()});
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
