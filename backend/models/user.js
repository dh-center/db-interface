const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const argon2 = require('argon2');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username is required'
  },
  hashedPassword: {
    type: String,
    required: 'Password is required'
  }
});

/**
 * Creates new user in DB and returns him
 * @param {String} username - Username
 * @param {String} password - User's password
 * @param {Function} [cb] - callback (if not specified, promises are used)
 * @returns {Promise} - created user
 */
userSchema.statics.create = async function (username, password, cb) {
  const hashedPassword = await argon2.hash(password);
  const user = new this({ username, hashedPassword });

  return user.save(cb);
};

/**
 * Compare password
 * @param {String} password - non-hashed user's password
 * @returns {Promise<boolean>} - compare result
 */
userSchema.methods.comparePassword = function (password) {
  return argon2.verify(this.hashedPassword, password);
};

module.exports = mongoose.model('users', userSchema);
