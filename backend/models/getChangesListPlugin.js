const jsonpatch = require('fast-json-patch');

module.exports = function loadedAtPlugin(schema) {
  schema.statics.getChangesList = async function (entityId, modifiedData) {
    const entity = entityId ? await this.findById(entityId).lean() : {};

    delete entity._id;
    delete entity.__v;
    delete modifiedData._id;
    delete modifiedData.__v;

    return jsonpatch.compare(entity, modifiedData);
  };
};
