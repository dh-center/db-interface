const types = {};

/**
 * Base class for schema field type
 */
types.Base = class {
  /**
   * Return object with all necessary fields
   * @abstract
   */
  static assigner() {}

  /**
   * Validates field and throws an error if the field is in the wrong format
   */
  static validator() {}

  /**
   * Get the descriptor for the property which will represent data in this type
   * @param {String} fieldName - name of the field to which this descriptor will applied
   * @return {PropertyDescriptor}
   */
  static getDescriptor(fieldName) {
    return {
      set(value) {
        this.data[fieldName] = value;
      },

      get() {
        return this.data[fieldName];
      }
    };
  }
};

/**
 * Represents objects object containing data in different languages
 */
types.MultilingualString = class extends types.Base {
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

  /**
   * @inheritDoc
   */
  static getDescriptor(fieldName) {
    return {
      set(value) {
        this.data[fieldName][this.language] = value;
      },

      get() {
        return this.data[fieldName][this.language] || '';
      }
    };
  }
};

/**
 * Represents stringп
 */
types.String = class extends types.Base {
  /**
   * @param {String} dateString - string
   * @return {string}
   */
  static assigner(dateString) {
    if (!dateString) return '';
    return dateString;
  }
};

export default types;
