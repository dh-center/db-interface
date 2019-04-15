const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: 'Email is required'
  },
  hashedPassword: {
    type: String,
    required: 'Password is required'
  }
});

/**
 * Creates new user in DB and returns him
 * @param {String} email - user email
 * @param {String} password - user password
 * @param {Function} [cb] - callback (if not specified, Promises are used)
 * @returns {Promise} - created user
 */
userSchema.statics.create = async function (email, password, cb) {
  /**
   * @const {Number} - cost factor: the higher the number, the more difficult is brute-forcing.
   */
  const saltRounds = 12;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new this({ email, hashedPassword });

  return user.save(cb);
};

/**
 * Generates JWT
 * @param {Function} [cb] - callback (if not specified, Promises are used)
 * @returns {String} - generated JWT
 */
userSchema.methods.generateJWT = function (cb) {
  return jwt.sign({
    id: this._id
  }, process.env.JWT_SECRET_STRING, { expiresIn: '15min' }, cb);
};

/**
 * Compare Password
 * @param {String} password - non-hashed password
 * @param {Function} [cb] - callback (if not specified, Promises are used)
 * @returns {Promise<boolean>} - compare result
 * */
userSchema.methods.comparePassword = function (password, cb) {
  return bcrypt.compare(password, this.hashedPassword, cb);
};

module.exports = mongoose.model('users', userSchema);
