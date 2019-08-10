/**
 * Mutations enum for this module
 */
import { FETCH_ALL } from './actionTypes';
import axios from 'axios';
const mutationTypes = {
  SET_PERSONS_LIST: 'SET_PERSONS_LIST' // Sets user's access token (for example, after authentication)
};

/**
 * Creates module state
 * @return {{list: []}}
 */
function initialState() {
  return {
    list: []
  };
}

const actions = {
  async [FETCH_ALL]({ commit }) {
    const response = await axios.get('/persons');

    commit(mutationTypes.SET_PERSONS_LIST, response.data.data);
  }
};

const mutations = {
  [mutationTypes.SET_PERSONS_LIST](state, list) {
    state.list = list;
  }
};

export default {
  state: initialState(),
  actions,
  mutations
};
