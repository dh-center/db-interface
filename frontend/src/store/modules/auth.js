/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import {
  LOGIN,
  SET_TOKEN
} from '../actions/auth';
import { RESET_STORE } from '../actions';
import axios from 'axios';

/**
 * Module state
 * @typedef {object} AuthModuleState
 * @property {string} accessToken - user's access token
 */

/**
 * Creates module state
 * @return {AuthModuleState}
 */
function initialState() {
  return {
    accessToken: ''
  };
}

const getters = {
  /**
   * Return true if the user is authenticated, else false
   * @param {AuthModuleState} state - vuex state
   * @return {boolean}
   */
  isAuthenticated: state => !!state.accessToken
};

const actions = {
  /**
   * Send login request to the server and performs user login
   * @param {function} commit - standard Vuex commit function
   * @param {User} user - user's params for auth
   */
  async [LOGIN]({ commit }, user) {
    try {
      const response = await axios.get('/login', {
        params: {
          username: user.username,
          password: user.password
        }
      });

      if (!response.data.error) {
        commit(SET_TOKEN, response.data.accessToken);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Resets module state
   * @param {function} commit - standard Vuex commit function
   */
  [RESET_STORE]({ commit }) {
    commit(RESET_STORE);
  }
};

const mutations = {
  /**
   * Mutation caused by successful authentication
   * @param {AuthModuleState} state - Vuex state
   * @param {string} accessToken - user's access token
   */
  [SET_TOKEN](state, accessToken) {
    state.accessToken = accessToken;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  },

  /**
   * Resets module state
   * @param {AuthModuleState} state - Vuex state
   */
  [RESET_STORE](state) {
    delete axios.defaults.headers.common['Authorization'];
    Object.assign(state, initialState());
  }
};

export default {
  state: initialState(),
  getters,
  actions,
  mutations
};
