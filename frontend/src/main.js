import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000';

Vue.prototype.$API_ENDPOINT = axios.defaults.baseURL;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
