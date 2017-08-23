// src/auth/index.js

import router from '../router'
// import axios from 'axios'
import Vue from 'vue'
import axios from 'axios'

// URL and endpoint constants
const HOST = 'http://localhost/'
// const API_URL = HOST + 'api/'
const LOGIN_URL = HOST + 'api-token-auth/'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login (context, username, password, redirect) {
    var self = this

    axios.post(LOGIN_URL, {
      username: username,
      password: password
    })
      .then(function (response) {
        console.log(this)
        localStorage.setItem('token', response.data.token)

        self.user.authenticated = true

        // Redirect to a specified route
        if (redirect) {
          router.go(redirect)
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    // context.$http.post(LOGIN_URL, {
    //   username: username,
    //   password: password
    // }).then(response => {
    //   localStorage.setItem('token', response.data.token)
    //   this.user.authenticated = true
    //   // Redirect to a specified route
    //   if (redirect) {
    //     router.push(redirect)
    //   }
    // }, response => {
    //   console.log(response)
    // })
  },

  // To log out, we just need to remove the token
  logout () {
    localStorage.removeItem('token')
    this.user.authenticated = false
    delete Vue.http.headers.common['Authorization']
    router.push('/login')
  },

  checkAuth () {
    var jwt = localStorage.getItem('token')
    if (jwt) {
      this.user.authenticated = true
      console.log('Is auhenticated')
    } else {
      this.user.authenticated = false
      console.log('Not auhenticated')
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Token ' + localStorage.getItem('token')
    }
  }
}
