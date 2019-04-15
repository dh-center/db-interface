/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth';
import axios from 'axios';
import router from '../../router.js';

const state = {
  token: localStorage.getItem('user-token') || '',
  status: ''
};

const getters = {
  isAuthenticated: state => !!state.token
};

const actions = {
  async [AUTH_REQUEST]({ commit, dispatch }, user) {
    try {
      commit(AUTH_REQUEST);
      const resp = await axios.get('/login', {
        params: {
          email: user.email,
          password: user.password
        }
      });

      commit(AUTH_SUCCESS, resp.data.jwt);
      return resp;
    } catch (err) {
      commit(AUTH_ERROR, err);
      throw err;
    }
  }
};

const mutations = {
  [AUTH_REQUEST](state) {
    state.status = 'loading';
  },
  [AUTH_SUCCESS](state, token) {
    localStorage.setItem('user-token', token);
    axios.defaults.headers.common['Authorization'] = token;
    state.status = 'success';
    state.token = token;
  },
  [AUTH_ERROR](state) {
    state.status = 'error';
    this.commit(AUTH_LOGOUT);
  },
  [AUTH_LOGOUT](state) {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user-token');
    state.token = '';
    router.push('/sign-in');
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
