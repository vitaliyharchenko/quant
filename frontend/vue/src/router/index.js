import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Task from '@/components/Task'
import Login from '@/components/Login'
import Counter from '@/components/Counter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/vuex',
      name: 'Vuex Counter',
      component: Counter
    }
  ],
  mode: 'history'
})
