const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

/**
 * Read environment settings
 */
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/**
 * Setup DB
 */
require('./modules/db');

/**
 * Setup necessary middlewares
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Add headers for allow CORS
 */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

/**
 * Persons routes
 */
const personsRoutes = require('./routes/persons');

app.use(personsRoutes);

/**
 * Locations routes
 */
const locationsRoutes = require('./routes/locations');

app.use(locationsRoutes);

/**
 * Relations routes
 */
const relationsRoutes = require('./routes/relations');

app.use(relationsRoutes);

/**
 * Auth routes
 */
const signUpRoute = require('./routes/auth/sign-up');
const loginRoute = require('./routes/auth/login');

app.use(signUpRoute);
app.use(loginRoute);

/**
 * Start server
 */
app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server running at ${process.env.HOST}:${process.env.PORT}/`);
});
