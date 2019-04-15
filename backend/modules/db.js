const mongoose = require('mongoose');

const mongodbOptions = {
  protocol: 'mongodb://',
  user: process.env.MONGODB_ROOT_USERNAME,
  password: process.env.MONGODB_ROOT_PASSWORD,
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_LOCAL_PORT,
  authSource: process.env.MONGODB_AUTH_SOURCE,
  dbName: process.env.MONGODB_DATABASE
};

/**
 * Create URL to connect to MongoDB
 * @param {String} protocol - connection protocol (for example, mongodb://)
 * @param {String} host - host where MongoDB is running
 * @param {String} port - port where MongoDB is running
 * @param {String} dbName - database name for connection
 * @param {String} [user] - username for authentication
 * @param {String} [password] - password for authentication
 * @param {String} [authSource] - database name for authentication
 * @returns {String} - URL to connect to MongoDB
 */
function getMongoUrl({ protocol, host, port, dbName, user, password, authSource }) {
  if (user && password && authSource) {
    return `${protocol + user}:${password}@${host}:${port}/${dbName}?authSource=${authSource}`;
  }
  return `${protocol + host}:${port}/${dbName}`;
}

mongoose.connect(getMongoUrl(mongodbOptions), {
  useNewUrlParser: true,
  useCreateIndex: true
});
