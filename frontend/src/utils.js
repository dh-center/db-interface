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
 * @param {Array<string, object>} props - property names to define
 */
export function defineStandardProperties(to, from, props) {
  const propsWithDescriptors = {};

  props.forEach(property => {
    let propertyName;

    let defaultValue = '';

    if (typeof property === 'object') {
      propertyName = property.name;
      defaultValue = property.default;
    } else {
      propertyName = property;
    }

    if (!from[propertyName]) {
      from[propertyName] = defaultValue;
    }

    propsWithDescriptors[propertyName] = {
      set(value) {
        from[propertyName] = value;
      },
      get() {
        return from[propertyName];
      }
    };
  });
  Object.defineProperties(to, propsWithDescriptors);
}

/**
 * Decodes JWT and returns it's JSON content
 * @param {String} token - jwt token
 * @returns {Object}
 */
export function decodeToken(token) {
  return JSON.parse(atob(token.split('.')[1]));
}
