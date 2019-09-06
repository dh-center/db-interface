import store from '../store';
import cloneDeep from 'lodash.clonedeep';

function getMultilingualString() {
  return {
    en: '',
    ru: ''
  };
}

function getMultilingualDescriptor(propName) {
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
      this.data[propName] = value;
    },
    get() {
      return this.data[propName];
    }
  };
}

export default class Person {
  constructor(_personData) {
    const personData = cloneDeep(_personData);

    this.id = personData._id;
    delete personData._id;

    this.data = personData;
    this.data.firstName = this.data.firstName || getMultilingualString();
    this.data.lastName = this.data.lastName || getMultilingualString();
    this.data.patronymic = this.data.patronymic || getMultilingualString();
    this.data.description = this.data.description || getMultilingualString();

    Object.defineProperty(this, 'firstName', getMultilingualDescriptor('firstName'));
    Object.defineProperty(this, 'lastName', getMultilingualDescriptor('lastName'));
    Object.defineProperty(this, 'patronymic', getMultilingualDescriptor('patronymic'));
    Object.defineProperty(this, 'description', getMultilingualDescriptor('description'));
    Object.defineProperty(this, 'birthDate', getStandardDescriptor('birthDate'));
    Object.defineProperty(this, 'deathDate', getStandardDescriptor('deathDate'));
  }

  get language() {
    return store.state.app.dataLanguage;
  }
}
