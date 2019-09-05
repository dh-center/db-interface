import store from '../store';

function getMultilingualString() {
  return {
    en: '',
    ru: ''
  };
}

function getMultilingualDesriptor(propName) {
  return {
    set(value) {
      this.data[propName][this.language] = value;
    },
    get() {
      return this.data[propName][this.language];
    }
  };
}

function getStandardDescriptor(propName) {
  return {
    set(value) {
      this.data[propName][this.language] = value;
    },
    get() {
      return this.data[propName][this.language];
    }
  };
}

export default class Person {
  constructor(personData) {
    this.data = personData;
    this.data.firstName = this.data.firstName || getMultilingualString();
    this.data.lastName = this.data.lastName || getMultilingualString();
    this.data.patronymic = this.data.patronymic || getMultilingualString();
    this.data.description = this.data.description || getMultilingualString();

    Object.defineProperty(this, 'firstName', getMultilingualDesriptor('firstName'));
    Object.defineProperty(this, 'lastName', getMultilingualDesriptor('lastName'));
    Object.defineProperty(this, 'patronymic', getMultilingualDesriptor('patronymic'));
    Object.defineProperty(this, 'description', getMultilingualDesriptor('description'));
    Object.defineProperty(this, 'birthDate', getStandardDescriptor('birthDate'));
    Object.defineProperty(this, 'deathDate', getStandardDescriptor('deathDate'));
  }

  get language() {
    return store.state.app.dataLanguage;
  }
}
