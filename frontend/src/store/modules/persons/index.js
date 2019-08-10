/**
 * Mutations enum for this module
 */
import { CREATE_NEW_PERSON, FETCH_ALL_PERSONS } from './actionTypes';
import axios from 'axios';

/**
 * @typedef {Object} PersonsModuleState
 * @property {[Person]} list - list of all persons
 */

/**
 * @typedef {Object} Person
 * @see {@link https://github.com/dh-lab/db-interface/blob/master/backend/models/person.js}
 */

/**
 * Mutations enum for this module
 */
const mutationTypes = {
  SET_PERSONS_LIST: 'SET_PERSONS_LIST' // Sets new persons list
};

/**
 * Creates module state
 * @return {PersonsModuleState}
 */
function initialState() {
  return {
    list: []
  };
}

const actions = {
  /**
   * Fetch all persons from API
   * @param {function} commit - standard Vuex commit function
   * @return {Promise<void>}
   */
  async [FETCH_ALL_PERSONS]({ commit }) {
    const response = await axios.get('/persons');

    commit(mutationTypes.SET_PERSONS_LIST, response);
  },

  async [CREATE_NEW_PERSON]({ commit }, personData) {
    await axios.post('/persons', personData);
  }
};

const mutations = {
  /**
   * Set new persons list
   * @param {PersonsModuleState} state - Vuex state
   * @param {[Person]} list - new persons list
   */
  [mutationTypes.SET_PERSONS_LIST](state, list) {
    state.list = list;
  }
};

export default {
  state: initialState(),
  actions,
  mutations
};
