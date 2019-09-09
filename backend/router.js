const express = require('express');
const router = express.Router();
const Person = require('./models/person');
const Location = require('./models/location');
const RelationType = require('./models/relationType');
const Address = require('./models/address');

/**
 * Auth routes
 */
const signUpRoute = require('./routes/auth/sign-up');
const loginRoute = require('./routes/auth/login');

router.use(signUpRoute);
router.use(loginRoute);

/**
 * Entity routes
 */
const entityFactory = require('./routes/entityFactory');

router.use(entityFactory('persons', Person));
router.use(entityFactory('locations', Location));
router.use(entityFactory('addresses', Address));
router.use(entityFactory('relationTypes', RelationType));

router.use('/synonym-test', async (req, res) => {
  const relationType = new RelationType({
    name: 'мяу',
    synonyms: [
      {
        name: 'гыгы'
      }
    ]
  });

  await relationType.save();
  res.sendStatus(200);
});

/**
 * Changes routes
 */
const changesFactory = require('./routes/changesFactory');

router.use(changesFactory('persons', Person));
router.use(changesFactory('locations', Location));
router.use(changesFactory('addresses', Address));
router.use(changesFactory('relationTypes', RelationType));

module.exports = router;
