<template>
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Регистрация</h2>
      <p>Введите свою почту и придумайте пароль</p>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <form autocomplete="on">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Имя"
            v-model="firstName"
          >
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Фамилия"
            v-model="lastName"
          >
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            v-model="email"
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
        <button class="btn btn-primary" @click.prevent="submit()">Зарегистрироваться</button>
      </form>
    </div>
  </template>

  <script>
  import auth from '../auth'

  export default {
    data () {
      return {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        error: ''
      }
    },
    methods: {
      submit () {
        var username = this.email
        var password = this.password
        var firstName = this.firstName
        var lastName = this.lastName
        var email = this.email

        console.log(username + password + email + firstName + lastName)
        auth.reg(this, username, password, email, firstName, lastName)
      }
    }

  }
  </script>