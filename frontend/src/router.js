import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/form');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/form',
      name: 'form',
      component: () => import(/* webpackChunkName: 'form' */ './views/Form.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('./views/auth/SignUp.vue'),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/auth/Login.vue'),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('./views/auth/Logout.vue'),
      beforeEnter: ifAuthenticated
    }
  ]
});
