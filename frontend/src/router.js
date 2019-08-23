import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
              routes: [
    {
      'path': '/',
      name: 'form',
      component: () => import(/* webpackChunkName: 'form' */ './views/Form.vue')
    },
    {
      path: '/persons',
      component: () => import('./views/persons/Overview.vue'),
      children: [
        {
          path: '',
          name: 'persons-overview',
          component: () => import('./views/persons/OverviewTable.vue')
        },
        {
          path: 'changes',
          name: 'persons-changes',
          component: () => import('./views/persons/ChangesTable.vue')
        },
        {
          path: 'create',
          name: 'persons-create',
          component: () => import('./views/persons/OverviewSpecific.vue')
        },
        {
          path: ':personId/edit',
          name: 'persons-edit',
          component: () => import('./views/persons/OverviewSpecific.vue')
        }
      ]
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('./views/auth/SignUp.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/auth/Login.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authRoutes = /^\/(login|sign-up)/;

  if (store.getters.isAuthenticated) {
    if (authRoutes.test(to.fullPath)) {
      next('/');
    }
  } else {
    if (!authRoutes.test(to.fullPath)) {
      next('/login');
    }
  }
  next();
});

export default router;
