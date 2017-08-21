// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
const v = new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})

// This should be the only new line ***
v.$store.dispatch('getTodos')
