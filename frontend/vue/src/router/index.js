import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Api from '@/components/Api'
import Auth from '@/components/Auth'
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
      path: '/api',
      name: 'Api',
      component: Api
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
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
    }
  ]
})
