/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import {
  LOGIN,
  SIGN_UP
} from './actionTypes';
import { RESET_STORE } from '../../actions';
import axios from 'axios';
import { decodeToken } from '../../../utils';

/**
 * Mutations enum for this module
 */
const mutationTypes = {
  SET_TOKEN: 'SET_TOKENS' // Sets user's access token (for example, after authentication)
};

/**
 * Module state
 * @typedef {object} AuthModuleState
 * @property {string} accessToken - user's access token
 * @property {User} user
 */

/**
 * Creates module state
 * @return {AuthModuleState}
 */
function initialState() {
  return {
    accessToken: '',
    user: {
      id: '',
      isAdmin: false
    }
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
   * @param {String} username - user's username
   * @param {String} password - user's password
   */
  async [LOGIN]({ commit }, { username, password }) {
    const response = await axios.get('/login', {
      params: {
        username,
        password
      }
    });

    commit(mutationTypes.SET_TOKEN, response.accessToken);
  },

  /**
   * Send login request to the server and performs user login
   * @param {function} commit - standard Vuex commit function
   * @param {String} username - user's username
   * @param {String} password - user's password
   */
  async [SIGN_UP]({ commit }, { username, password }) {
    await axios.post('/sign-up', {
      username,
      password
    });
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
  [mutationTypes.SET_TOKEN](state, accessToken) {
    state.accessToken = accessToken;
    const jwtData = decodeToken(accessToken);

    state.user.isAdmin = jwtData.isAdmin;
    state.user.id = jwtData.id;
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
