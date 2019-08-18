/**
 * Class representing a data structure constructed according to the scheme
 */
export default class Model {
  /**
   * Creates Model instance
   * @param {Schema} schema - data schema
   */
  constructor(schema) {
    const fields = schema.fields;

    this.data = {};
    for (const fieldName in fields) {
      if (!Object.hasOwnProperty.call(fields, fieldName)) continue;
      Object.defineProperty(this, fieldName, fields[fieldName].getDescriptor(fieldName));
    }
  }
}
