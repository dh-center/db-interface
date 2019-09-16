import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './localization/i18next';
import store from './store';
import './httpClient';
import UniqueId from 'vue-unique-id';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import './directives';

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [ new Integrations.Vue({ Vue, logErrors: true }) ]
});

Vue.use(UniqueId);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
