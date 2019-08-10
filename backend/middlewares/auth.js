const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Check user's auth token and checks his permissions
 * @param {Request} req  -express request object
 * @param {Response} res - express response object
 * @param {Function} next - next express middleware
 */
module.exports = async function (req, res, next) {
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
};
