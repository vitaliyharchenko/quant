// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'

import App from './components/App'
import router from './router'
import auth from './auth'
import store from './store'

import './styles'

Vue.config.productionTip = false
Vue.use(Router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

auth.checkAuth()
