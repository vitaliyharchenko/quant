  <template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="info">
          <b-nav-toggle target="nav_collapse"></b-nav-toggle>
          <b-navbar-brand href="/">Quant</b-navbar-brand>
          <b-collapse is-nav id="nav_collapse">
            <b-nav is-nav-bar>
              <b-nav-item href="/tasks">Tasks</b-nav-item>
              <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-nav>
            <!-- Right aligned nav items -->
            <b-nav is-nav-bar class="ml-auto">
              <b-nav-item-dropdown right>
                <!-- Using button-content slot -->
                <template slot="button-content">
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item v-if="user.authenticated" href="" @click.prevent="logout()">Logout</b-dropdown-item>
                <b-dropdown-item v-else href="/login">Login</b-dropdown-item>
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
    .navbar {
      margin-bottom: 50px;
    }
  </style>
