/**
 * Base class for data schemas
 */
export default class Schema {
  /**
   * Creates schema instance
   * @param {Object<string, SchemaType>} fieldsDefinition - object contains all fields represents data instance
   */
  constructor(fieldsDefinition) {
    this.fields = fieldsDefinition;
  }

  /**
   * Сhecks the object for compliance with the scheme
   * @param {Object} object - object to check
   */
  validate(object) {
    for (const field in this.fields) {
      this.fields[field].validator(object[field]);
    }
  }

  /**
   * Adds missing fields to the object in the correct format
   * @param {Object} object - modifiable object
   * @return {*}
   */
  assign(object) {
    for (const field in this.fields) {
      object[field] = this.fields[field].assigner(object[field]);
    }
    return object;
  }
}
