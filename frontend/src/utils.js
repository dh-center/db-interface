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
 * Defines getter and setter for multilingual property
 * @param {Object} to - object to assign property
 * @param {Object} from - where to get the value
 * @param {String[]} propNames - property names to define
 */
export function defineMultilingualProperties(to, from, propNames) {
  const props = {};

  propNames.forEach(propName => {
    if (!from[propName]) {
      from[propName] = getMultilingualString();
    }

    props[propName] = {
      set(value) {
        from[propName][this.language] = value;
      },
      get() {
        return from[propName][this.language] || '';
      }
    };
  });
  Object.defineProperties(to, props);
}

/**
 * Defines getter and setter with specified property name
 * @param {Object} to - object to assign property
 * @param {Object} from - where to get the value
 * @param {String[]} propNames - property names to define
 */
export function defineStandardProperties(to, from, propNames) {
  const props = {};

  propNames.forEach(propName => {
    if (!from[propName]) {
      from[propName] = '';
    }

    props[propName] = {
      set(value) {
        console.log('setter', propName, value);
        from[propName] = value;
        console.log(from[propName]);
      },
      get() {
        return from[propName];
      }
    };
  });
  Object.defineProperties(to, props);
}
