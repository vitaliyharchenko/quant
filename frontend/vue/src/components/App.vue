  <template>
    <div id="app">
      <img src="../assets/logo.png">
      <p>
        <!-- используйте компонент router-link для создания ссылок -->
        <!-- входной параметр `to` определяет путь для перехода -->
        <!-- `<router-link>` по умолчанию преобразуется в тег `<a>` -->
        <router-link to="/">Index</router-link>
        <router-link to="/tasks">Tasks</router-link>
        <a v-if="user.authenticated" href="" @click.prevent="logout()">Logout</a>
        <router-link v-else to="/login">Login</router-link>
      </p>
      <router-view></router-view>
    </div>
  </template>

  <script>
  import auth from '../auth'
  import router from '../router'

  export default {
    data () {
      return {
        user: auth.user
      }
    },
    methods: {
      logout () {
        auth.logout()
      }
    },
    created () {
      auth.checkAuth()
      if (!auth.user.authenticated) {
        router.push('login')
      }
    }
  }
  </script>

  <style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
