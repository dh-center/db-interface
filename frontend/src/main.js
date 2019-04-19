import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.SERVER_URL || 'http://localhost:3000';
console.log(process.env);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
