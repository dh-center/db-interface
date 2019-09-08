import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: 'form' */ './views/Form.vue')
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
    },
    generateRoutes('persons'),
    generateRoutes('locations'),
    generateRoutes('addresses'),
    generateRoutes('relationTypes'),
    {
      path: '*',
      redirect: '/home'
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

/**
 * Generate routes for entities by name
 * @param {String} name - entities name
 * @return {Object}
 */
function generateRoutes(name) {
  return {
    path: `/${name}`,
    component: () => import('./views/entities/Overview.vue'),
    props: { entityName: name },
    children: [
      {
        path: '',
        name: `${name}-overview`,
        component: () => import('./views/entities/OverviewTable.vue')
      },
      {
        path: 'changes',
        name: `${name}-changes`,
        component: () => import('./views/entities/ChangesTable.vue')
      },
      {
        path: 'create/:changeRecordId?',
        name: `${name}-create`,
        component: () => import('./views/entities/Create.vue')
      },
      {
        path: ':entityId/edit',
        name: `${name}-overview-specific`,
        component: () => import('./views/entities/OverviewSpecific.vue')
      }
    ]
  };
}

export default router;
