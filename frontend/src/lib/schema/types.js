export class SchemaType {
  static assigner() {
  }

  static validator() {
    return true;
  }
}

export class MultilingualString extends SchemaType {
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

export class ApiDate extends SchemaType {
  static assigner(dateString) {
    if (!dateString) return '';
    return dateString.substring(0, 10);
  }

  static validator(dateString) {
    const dateRegex = /^(\d{4})-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;

    if (dateRegex.test(dateString)) {
      return true;
    }
    throw new Error('Wrong data format');
  }
}
