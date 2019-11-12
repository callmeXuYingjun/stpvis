// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './vuex/store.js'
import iView from 'iview';
import Vuex from 'vuex'
import axios from 'axios'
import 'iview/dist/styles/iview.css';

axios.defaults.baseURL = 'http://localhost:3000';
Vue.use(Vuex)
Vue.use(iView)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#App',
  render: c => c(App),
  router,
  store
})
