  <template>
    <div id="app">
        <b-navbar toggleable="md" type="light" variant="light">
          <b-nav-toggle target="nav_collapse"></b-nav-toggle>
          <b-navbar-brand href="/">Quant</b-navbar-brand>
          <b-collapse is-nav id="nav_collapse">
            <b-nav is-nav-bar>
              <b-nav-item href="/tasks" disabled>Задания</b-nav-item>
            </b-nav>
            <!-- Right aligned nav items -->
            <b-nav is-nav-bar class="ml-auto">
              <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template slot="button-content">
                  <em>Профиль</em>
                </template>
                <b-dropdown-item v-if="user.authenticated" href="" @click.prevent="logout()">Выйти</b-dropdown-item>
                <div v-else>
                  <b-dropdown-item href="/login">Войти</b-dropdown-item>
                  <b-dropdown-item href="/reg">Зарегистироваться</b-dropdown-item>
                </div>
              </b-nav-item-dropdown>
            </b-nav>
          </b-collapse>
        </b-navbar>
        <b-container>
          <router-view></router-view>
        </b-container>
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
    body {
      padding-bottom: 50px;
    }
    .navbar {
      margin-bottom: 50px;
    }
  </style>
