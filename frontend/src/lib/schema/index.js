export default class Schema {
  constructor(fieldsDefinition) {
    this.fields = fieldsDefinition;
  }

  validate(object) {
    for (const field in this.fields) {
      this.fields[field].validator(object[field]);
    }
  }

  assign(object) {
    for (const field in this.fields) {
      object[field] = this.fields[field].assigner(object[field]);
    }
    return object;
  }
}
