import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios";

const axiosJSON = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000
});

const axiosUpload = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 30000,
  headers: {'Content-Type': 'multipart/form-data'}
});

Vue.prototype.axiosJSON=axiosJSON;
Vue.prototype.axiosUpload=axiosUpload;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
