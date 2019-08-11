import { CHANGE_DATA_LANG } from './actionTypes';
import i18n from '../../../localization/i18next';

/**
 * Enum of mutation types for this module
 */
const mutationTypes = {
  SET_DATA_LANG: 'SET_DATA_LANG' // Set language in which data from the database will be displayed
};

/**
 * Module state
 * @typedef {object} AppModuleState
 * @property {string} dataLanguage - language in which data from the database will be displayed
 */

/**
 * Creates module state
 * @return {AppModuleState}
 */
function initialState() {
  return {
    dataLanguage: i18n.i18next.language
  };
}

const actions = {
  /**
   * Change language in which data from the database will be displayed
   * @param {function} commit - standard vuex commit function
   * @param {String} lang - language to set
   */
  [CHANGE_DATA_LANG]({ commit }, lang) {
    commit(mutationTypes.SET_DATA_LANG, lang);
  }
};

const mutations = {
  /**
   * Change language in which data from the database will be displayed
   * @param {AppModuleState} state - vuex module state
   * @param {String} lang - language to set
   */
  [mutationTypes.SET_DATA_LANG](state, lang) {
    state.dataLanguage = lang;
  }
};

export default {
  state: initialState(),
  mutations,
  actions
};
