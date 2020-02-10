const express = require('express');
const router = express.Router();
const summary = require('./routes/summary');
const Person = require('./models/person');
const Location = require('./models/location');
const RelationType = require('./models/relationType');
const Address = require('./models/address');
const Relation = require('./models/relation');
const LocationType = require('./models/locationType');
const Route = require('./models/routes');

/**
 * Auth routes
 */
const signUpRoute = require('./routes/auth/sign-up');
const loginRoute = require('./routes/auth/login');

router.use(signUpRoute);
router.use(loginRoute);

/**
 * Route for sending users statistics to the chat
 */
router.use('/summary', summary);

/**
 * Entity routes
 */
const entityFactory = require('./routes/entityFactory');

router.use(entityFactory('persons', Person));
router.use(entityFactory('locations', Location));
router.use(entityFactory('addresses', Address));
router.use(entityFactory('relations', Relation));
router.use(entityFactory('relationTypes', RelationType));
router.use(entityFactory('locationTypes', LocationType));
router.use(entityFactory('routes', Route));

/**
 * Changes routes
 */
const changesFactory = require('./routes/changesFactory');

router.use(changesFactory('persons', Person));
router.use(changesFactory('locations', Location));
router.use(changesFactory('addresses', Address));
router.use(changesFactory('relations', Relation));
router.use(changesFactory('relationTypes', RelationType));
router.use(changesFactory('locationTypes', LocationType));
router.use(changesFactory('routes', Route));

const uploads = require('./routes/uploads');

router.use(uploads);

module.exports = router;
