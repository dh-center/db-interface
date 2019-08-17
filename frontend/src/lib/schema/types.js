/**
 * Base class for schema field type
 */
export class SchemaType {
  /**
   * Return object with all necessary fields
   * @abstract
   */
  static assigner() {}

  /**
   * Validates field and throws an error if the field is in the wrong format
   */
  static validator() {}
}

/**
 * Represents objects object containing data in different languages
 */
export class MultilingualString extends SchemaType {
  /**
   * Return object containing data in different languages
   * @param {Object} stringsObject
   * @return {{ru: string, en: string}|*}
   */
  static assigner(stringsObject) {
    if (!stringsObject) {
      return {
        en: '',
        ru: ''
      };
    }
    return stringsObject;
  }
}

/**
 * Represents string contains date in yyyy-mm-dd format
 */
export class ApiDate extends SchemaType {
  /**
   * @param {String} dateString - string contains date in api's format (e.g. 1904-11-12 03:00:00.000)
   * @return {string}
   */
  static assigner(dateString) {
    if (!dateString) return '';
    return dateString.substring(0, 10);
  }

  /**
   * Validates string and throws error if format is invalid
   * @param {string} dateString - string contains date in yyyy-mm-dd format
   */
  static validator(dateString) {
    if (!dateString) return;
    const dateRegex = /^(\d{4})-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;

    if (dateRegex.test(dateString.trim())) {
      return;
    }
    throw new Error('Wrong data format');
  }
}
