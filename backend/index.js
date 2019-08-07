const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

require('express-async-errors');

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
app.use(require('./middlewares/auth'));

/**
 * Add headers for allow CORS
 */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

/**
 * Setup routes
 */
app.use(require('./router'));

/**
 * Setup error handler
 */
app.use(require('./middlewares/errorHandler'));

/**
 * Start server
 */
app.listen(process.env.API_PORT, () => {
  console.log(`Server running at localhost:${process.env.API_PORT}/`);
});
