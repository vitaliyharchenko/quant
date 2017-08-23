// src/auth/index.js

import router from './router'
import axios from 'axios'

// URL and endpoint constants
const API_URL = 'http://localhost/'
const LOGIN_URL = API_URL + 'api-token-auth/'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login (context, creds, redirect) {
    axios.post(LOGIN_URL, {
      username: creds.username,
      password: creds.password
    })
      .then(function (response) {
        console.log(response)
        localStorage.setItem('token', response.data.token)

        this.user.authenticated = true

        // Redirect to a specified route
        if (redirect) {
          router.go(redirect)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },

  // To log out, we just need to remove the token
  logout () {
    localStorage.removeItem('token')
    this.user.authenticated = false
  },

  checkAuth () {
    var jwt = localStorage.getItem('token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Token ' + localStorage.getItem('token')
    }
  }
}
