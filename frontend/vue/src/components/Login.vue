<template>
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Авторизация</h2>
      <p>Войдите в свой профиль</p>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <form autocomplete="on">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            v-model="username"
          >
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Пароль"
            v-model="password"
          >
        </div>
        <button class="btn btn-primary" @click.prevent="submit()">Войти</button>
      </form>
    </div>
  </template>

  <script>
  import auth from '../auth'

  export default {
    data () {
      return {
        username: '',
        password: '',
        error: ''
      }
    },
    methods: {
      submit () {
        var username = this.username
        var password = this.password
        auth.login(this, username, password, 'Tasks')
      }
    }

  }
  </script>