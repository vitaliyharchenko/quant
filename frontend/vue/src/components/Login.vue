<template>
  <div>
    <h2>Log In</h2>
    <p>Log in to your account to get some great quotes.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <form autocomplete="on">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your username"
          v-model="username"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model="password"
        >
      </div>
      <button class="btn btn-primary" @click.prevent="login()">Login</button>
    </form>
  </div>
</template>

<script>
import auth from '../auth'
import router from '../router'

export default {
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login () {
      var username = this.username
      var password = this.password
      auth.login(this, username, password, 'tasks')
    },
    logout () {
      auth.logout()
    }
  },
  created () {
    if (auth.user.authenticated) {
      router.push('/')
    }
  }

}
</script>