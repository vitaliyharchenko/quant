import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'

import tasks from './modules/tasks'

Vue.use(Vuex)
Vue.use(BootstrapVue)

Vue.directive('focus', {
  // Когда привязанный элемент вставлен в DOM...
  inserted: function (el) {
    // Переключаем фокус на элемент
    el.scrollIntoView()
  }
})

export default new Vuex.Store({
  modules: {
    tasks
  }
})
