const express = require('express');
const router = express.Router();

/**
 * Auth routes
 */
const signUpRoute = require('./routes/auth/sign-up');
const loginRoute = require('./routes/auth/login');

router.use(signUpRoute);
router.use(loginRoute);

/**
 * Persons routes
 */
const personsRoutes = require('./routes/persons');

router.use(personsRoutes);

/**
 * Locations routes
 */
const locationsRoutes = require('./routes/locations');

router.use(locationsRoutes);

/**
 * Relations routes
 */
const relationsRoutes = require('./routes/relations');

router.use(relationsRoutes);

/**
 * Changes routes
 */
const changesRoutes = require('./routes/changes');

router.use(changesRoutes);

module.exports = router;
