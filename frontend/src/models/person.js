import store from '../store';

function getMultilingualString() {
  return {
    en: '',
    ru: ''
  };
}

export default class Person {
  constructor(personData) {
    this.data = personData;
    this.data.firstName = this.data.firstName || getMultilingualString();
    this.data.lastName = this.data.lastName || getMultilingualString();
    this.data.patronymic = this.data.patronymic || getMultilingualString();
    this.data.description = this.data.description || getMultilingualString();
  }

  get language() {
    return store.state.app.dataLanguage;
  }

  get name() {
    const firstName = this.data.firstName[this.language];
    const lastName = this.data.lastName[this.language];
    const patronymic = this.data.patronymic[this.language];

    return `${firstName} ${lastName} ${patronymic}`;
  }

  set name(value) {
    const [firstName, lastName, ...patronymic] = value.split(' ');

    this.data.firstName[this.language] = firstName;
    this.data.lastName[this.language] = lastName;
    this.data.patronymic[this.language] = patronymic.join(' ');
  }
}
