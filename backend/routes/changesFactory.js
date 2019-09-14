const express = require('express');
const router = express.Router();
const Change = require('../models/change');
const jsonpatch = require('fast-json-patch');
const mongoose = require('mongoose');
const {ApproveForbiddenError} = require('../errorTypes');

/**
 *
 * @param {String} entityType - entity type name
 * @param {mongoose.Model} EntityModel - model
 * @return {Router}
 */
module.exports = function changesFactory(entityType, EntityModel) {
  /**
   * Get all non-approved changes in entities
   */
  router.get(`/changes/${entityType}`, async (req, res) => {
    const changes = await Change
      .find({ entityType: entityType, approved: null })
      .populate('entity')
      .lean();

    res.json({ payload: changes });
  });

  /**
   * Get changes for certain record
   */
  router.get(`/changes/${entityType}/:changesRecordId`, async (req, res) => {
    const changeRecord = await Change
      .findById(req.params.changesRecordId)
      .populate('entity');

    return res.status(200).json({ payload: changeRecord });
  });

  /**
   * Create new change record for existing or non-existing entity
   */
  router.post(`/changes/${entityType}/:entityId?`, async (req, res) => {
    const changeRecord = new Change({
      entityType: entityType,
      user: res.locals.user._id,
      ...(req.params.entityId && { entity: req.params.entityId }),
      changeList: await EntityModel.getChangesList(req.params.entityId, req.body)
    });
    const result = await changeRecord.save();

    res.status(201).json({ payload: result });
  });

  /**
   * Patch existing change record
   */
  router.patch(`/changes/${entityType}/:changesRecordId`, async (req, res) => {
    const changeRecord = await Change.findById(req.params.changesRecordId);

    changeRecord.changeList = await EntityModel.getChangesList(changeRecord.entity, req.body);
    await changeRecord.save();
    res.sendStatus(200);
  });

  /**
   * Approve changelist
   */
  router.put(`/changes/${entityType}/:changeId/approval`, async (req, res) => {
    const changeRecord = await Change.findById(req.params.changeId).populate('entity');

    if (!res.locals.user.isAdmin) {
      throw new ApproveForbiddenError();
    }

    if (changeRecord.entity) {
      const updatedDocument = jsonpatch.applyPatch(JSON.parse(JSON.stringify(changeRecord.entity)), changeRecord.changeList).newDocument;

      await EntityModel.updateOne({ _id: mongoose.Types.ObjectId(changeRecord.entity._id) }, updatedDocument);

      // @todo make request to the api for updating item

      changeRecord.approved = true;
      await changeRecord.save();
    } else {
      const entity = new EntityModel(jsonpatch.applyPatch({}, changeRecord.changeList).newDocument);

      changeRecord.approved = true;
      // @todo make request to the api for creating item

      await Promise.all([entity.save(), changeRecord.save()]);
    }
    res.sendStatus(200);
  });

  return router;
};
