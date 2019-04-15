import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/sign-in');
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: () => import(/* webpackChunkName: "catalog" */ './views/Catalog.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/texts/:textId/markup',
      name: 'markup',
      component: () => import(/* webpackChunkName: "editor" */ './views/Editor.vue'),
      beforeEnter: ifAuthenticated
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/sign-out',
      name: 'sign-out',
      component: () => import('./views/SignOut.vue'),
      beforeEnter: ifAuthenticated
    }
  ]
});
