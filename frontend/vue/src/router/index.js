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
      name: 'hello',
      component: Hello
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/task/:pk',
      name: 'task',
      component: Task,
      props: true
    }
  ],
  mode: 'history'
})
