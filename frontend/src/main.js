import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.API_ENDPOINT || 'http://localhost:3000';

Vue.prototype.$API_ENDPOINT = axios.defaults.baseURL;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
