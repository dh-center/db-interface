import axios from 'axios';
import i18n from './localization/i18next';
import Vue from 'vue';

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000';
Vue.prototype.$API_ENDPOINT = axios.defaults.baseURL;

axios.interceptors.response.use(
  response => response,
  async error => {
    if (!error.response) throw error;
    const apiError = error.response.data.error;

    if (!apiError) throw error;

    apiError.message = i18n.t(['apiErrorTypes.' + apiError.code, 'apiErrorTypes.SOMETHING_WENT_WRONG']);
    throw apiError;
  }
);
