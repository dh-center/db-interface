const express = require('express');
const router = express.Router();
const Change = require('../models/change');

/**
 *
 * @param {String} entityType - entity type name
 * @param {mongoose.Model} EntityModel - model
 * @return {Router}
 */
module.exports = function changesFactory(entityType, EntityModel) {
  router.get('/' + entityType, async (req, res) => {
    const dbQuery = req.query.name ? { name: { $regex: new RegExp(`${req.query.name}`, 'i') } } : {};

    try {
      const data = await (EntityModel.fetchAll ? EntityModel.fetchAll(dbQuery) : EntityModel.find(dbQuery).lean());

      res.json({ payload: data });
    } catch (error) {
      res.json({ error });
    }
  });

  router.get(`/${entityType}/:entityId`, async (req, res) => {
    let entity;

    try {
      entity = await EntityModel.findById(req.params.entityId).lean();
    } catch (e) {
      return res.sendStatus(400);
    }

    if (!entity) {
      return res.sendStatus(404);
    }

    if (req.query.withLastChanges) {
      const change = await Change.findOne({ entityType: entityType, approved: null, entity: entity._id }).lean();

      if (change) {
        entity.lastChangesRecord = change;
      }
    }
    res.json({ payload: entity });
  });

  return router;
};
