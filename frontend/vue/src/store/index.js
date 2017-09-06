import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import tasks from './modules/tasks'

Vue.use(Vuex)
Vue.use(BootstrapVue)

export default new Vuex.Store({
  modules: {
    tasks
  }
})
