const express = require('express');
const router = express.Router();
const Change = require('../models/change');
const jsonpatch = require('fast-json-patch');
const mongoose = require('mongoose');
const {
  ApproveForbiddenError,
  ChangesPatchingForbiddenError,
  SavingApprovedChangesError,
  RejectForbiddenError,
  AlreadyChangedError
} = require('../errorTypes');

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

    await Promise.all(changes.map(async changeRecord => {
      changeRecord.changedEntity = jsonpatch.applyPatch(changeRecord.entity || {}, changeRecord.changeList).newDocument;
      (EntityModel.processChangedEntity && await EntityModel.processChangedEntity(changeRecord.changedEntity));
    }));

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
    let entityId = req.params.entityId;
    let isCreated = false;

    if (!entityId) {
      const createdEntity = await (new EntityModel(req.body.changedEntity).save());

      entityId = createdEntity._id;
      isCreated = true;
    } else {
      const isAlreadyChanged = await Change.findOne({
        entityType,
        entity: entityId,
        approved: null
      }).lean();

      if (isAlreadyChanged) {
        throw new AlreadyChangedError();
      }
    }

    const changeRecord = new Change({
      entityType,
      user: res.locals.user._id,
      entity: entityId,
      deleted: req.body.deleted,
      isCreated,
      changeList: await EntityModel.getChangesList(entityId, req.body.changedEntity)
    });
    const result = await changeRecord.save();

    res.status(201).json({ payload: result });
  });

  /**
   * Patch existing change record
   */
  router.patch(`/changes/${entityType}/:changesRecordId`, async (req, res) => {
    const changeRecord = await Change.findById(req.params.changesRecordId);

    if (res.locals.user._id.toString() !== changeRecord.user.toString()) {
      throw new ChangesPatchingForbiddenError();
    }

    if (changeRecord.approved) {
      throw new SavingApprovedChangesError();
    }

    if (changeRecord.isCreated) {
      await EntityModel.updateOne({ _id: mongoose.Types.ObjectId(changeRecord.entity._id) }, req.body.changedEntity);
    }

    changeRecord.changeList = await EntityModel.getChangesList(changeRecord.entity, req.body.changedEntity);
    changeRecord.deleted = req.body.deleted;
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

    if (changeRecord.deleted) {
      await EntityModel.deleteOne({ _id: changeRecord.entity });

      changeRecord.approved = true;
      await changeRecord.save();
      return res.sendStatus(200);
    }

    if (changeRecord.entity) {
      const updatedDocument = jsonpatch.applyPatch(JSON.parse(JSON.stringify(changeRecord.entity)), changeRecord.changeList).newDocument;

      await EntityModel.updateOne({ _id: mongoose.Types.ObjectId(changeRecord.entity._id) }, updatedDocument);

      changeRecord.approved = true;
      await changeRecord.save();
    } else {
      const entity = new EntityModel(jsonpatch.applyPatch({}, changeRecord.changeList).newDocument);

      changeRecord.approved = true;

      await Promise.all([entity.save(), changeRecord.save()]);
    }
    res.sendStatus(200);
  });

  router.put(`/changes/${entityType}/:changeId/rejection`, async (req, res) => {
    const changeRecord = await Change.findById(req.params.changeId);
    const isAuthor = res.locals.user._id.toString() === changeRecord.user.toString();

    // if user is not admin or author
    if (!res.locals.user.isAdmin && !isAuthor) {
      throw new RejectForbiddenError();
    }

    if (changeRecord.isCreated) {
      await EntityModel.deleteOne({ _id: mongoose.Types.ObjectId(changeRecord.entity._id) });
    }

    changeRecord.approved = false;

    await changeRecord.save();
    res.sendStatus(200);
  });

  return router;
};
