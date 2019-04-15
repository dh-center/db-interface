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
 * Auth routes
 */
const signUpRoute = require('./routes/auth/sign-up');
const loginRoute = require('./routes/auth/login');

app.use(signUpRoute);
app.use(loginRoute);

/**
 * Text routes
 */
const textsRoute = require('./routes/texts');

app.use(textsRoute);

/**
 * Entity routes
 */
const entityRoute = require('./routes/entity');

app.use(entityRoute);

/**
 * Start server
 */
app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server running at ${process.env.HOST}:${process.env.PORT}/`);
});
