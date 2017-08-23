// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import auth from './auth'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Router)

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

console.log(vm)

auth.checkAuth()
console.log(auth.user.authenticated)
