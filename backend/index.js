const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const jwt = require('jsonwebtoken');
const User = require('./models/user');

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
app.use(async function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  const authRoutes = /^\/(login|sign-up)/;
  const reqUrl = req.originalUrl;

  let accessToken = req.headers['authorization'];

  if (/^Bearer [a-z0-9-_+/=]+\.[a-z0-9-_+/=]+\.[a-z0-9-_+/=]+$/i.test(accessToken)) {
    accessToken = accessToken.slice(7);
    try {
      const data = await jwt.verify(accessToken, process.env.JWT_SECRET_STRING);
      const user = await User.findOne({ _id: data.id });

      if (user) {
        res.locals.user = user;
        return next();
      } else {
        res.sendStatus(403);
        return res;
      }
    } catch (err) {
      return res.status(401).json({ error: err.toString() });
    }
  } else if (!authRoutes.test(reqUrl)) {
    res.sendStatus(403);
    return res;
  } else {
    return next();
  }
});

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
