const express = require('express');
const router = express.Router();

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
 * Auth routes
 */
const signUpRoute = require('./routes/auth/sign-up');
const loginRoute = require('./routes/auth/login');

router.use(signUpRoute);
router.use(loginRoute);

module.exports = router;
