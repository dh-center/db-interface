import axios from 'axios';
import i18n from './localization/i18next';

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000';

/**
 * Translates error messages from API server
 */
axios.interceptors.response.use(
  response => response.data.payload,
  async error => {
    if (!error.response || !error.response.data.error) throw new Error(error);

    throw new ApiError(error.response.data.error.code);
  }
);

/**
 * Class for throwing error from api
 */
class ApiError extends Error {
  /**
   * Error constructor
   * @param {String} code - error code from API
   */
  constructor(code) {
    super();
    this.message = i18n.t(['apiErrorTypes.' + code, 'apiErrorTypes.SOMETHING_WENT_WRONG']);
  }
}
