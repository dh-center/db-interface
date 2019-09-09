/**
 * Returns object with string values with keys for each language
 * @return {{ru: string, en: string}}
 */
export function getMultilingualString() {
  return {
    en: '',
    ru: ''
  };
}

/**
 * Returns property descriptor for multilingual data in object
 * Requires language property in object
 * @param {String} propName - property name for access
 * @return {{set(*): void, get(): *}|*}
 */
export function getMultilingualDescriptor(propName) {
  return {
    set(value) {
      this.data[propName][this.language] = value;
    },
    get() {
      return this.data[propName][this.language];
    }
  };
}

/**
 * Returns getters and setter for property in object
 * @param {String} propName - property name to access
 * @return {{set(*): void, get(): *}|*}
 */
export function getStandardDescriptor(propName) {
  return {
    set(value) {
      this.data[propName] = value;
    },
    get() {
      return this.data[propName];
    }
  };
}

export function defineMultilingualProperties(to, from, propNames) {
  const props = {};

  propNames.forEach(propName => (props[propName] = {
    set(value) {
      from[propName][this.language] = value;
    },
    get() {
      return from[propName][this.language];
    }
  }));
  Object.defineProperties(to, props);
}
