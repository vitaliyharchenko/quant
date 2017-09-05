import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Tasks from '@/components/Tasks'
import Task from '@/components/Task'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks
    },
    {
      path: '/task/:pk',
      name: 'task',
      component: Task,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
  mode: 'history'
})
