const { ApiError } = require('../errorTypes');

/**
 * Check error type and send it to the user with right http code and other information
 * @param {Error} error - occurred error
 * @param {Request} req  -express request object
 * @param {Response} res - express response object
 */
module.exports = function (error, req, res) {
  if (error instanceof ApiError) {
    return res.status(error.httpCode).json({ error });
  } else {
    console.log('Unexpected server error: ', error);
    return res.status(500).json({ error: 'Unexpected server error: ' + error.toString() });
  }
};
