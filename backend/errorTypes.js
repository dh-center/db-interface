/**
 * Base class for API errors
 */
class ApiError extends Error {
  /**
   * Creates error instance
   * @param {Number} httpCode - http code to send to user
   */
  constructor(httpCode) {
    super();
                     this.httpCode = httpCode;
  }
}

/**
 * Throws when trying to log in with the wrong username
 */
class NoUserWithSuchUsernameError extends ApiError {
  /**
   * Creates error instance
   * @param {Number} [httpCode=401] - http code to send to user
   */
  constructor(httpCode = 401) {
    super(httpCode);
         this.code = 'NO_USER_WITH_SUCH_USERNAME';
  }
}

/**
 * Throws when trying to log in with the wrong password
 */
class WrongUserPasswordError extends ApiError {
  /**
   * Creates error instance
   * @param {Number} [httpCode=401] - http code to send to user
   */
  constructor(httpCode = 401) {
    super(httpCode);
    this.code = 'WRONG_USER_PASSWORD';
  }
}

/**
 * Throws when trying to register with already registered username
 */
class UsernameDuplicationError extends ApiError {
  /**
   * Creates error instance
   * @param {Number} [httpCode=409] - http code to send to user
   */
  constructor(httpCode = 409) {
    super(httpCode);
    this.code = 'USERNAME_DUPLICATION';
  }
}

module.exports = {
  ApiError,
  NoUserWithSuchUsernameError,
  WrongUserPasswordError,
  UsernameDuplicationError
};
