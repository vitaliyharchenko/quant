// src/auth/index.js

import router from '../router'
import axios from 'axios'

// URL and endpoint constants
const HOST = 'http://quant.zone/'
// const API_URL = HOST + 'api/'
const LOGIN_URL = HOST + 'api-token-auth/'
const REG_URL = HOST + 'api/users/register/'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false,
    username: '',
    first_name: '',
    last_name: ''
  },

  // Send a request to the login URL and save the returned JWT
  login (context, username, password, redirect) {
    var self = this

    axios.post(LOGIN_URL, {
      username: username,
      password: password
    })
      .then(function (response) {
        localStorage.setItem('token', response.data.token)
        self.user.authenticated = true
        // Redirect to a specified route
        if (redirect) {
          router.push(redirect)
        }
      })
      .catch(function (error) {
        context.error = error.response.data.non_field_errors
        console.log(error)
      })
  },

  // Send a request to the login URL and save the returned JWT
  reg (context, username, password, email, firstName, lastName) {
    var self = this

    axios.post(REG_URL, {
      username: username,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName
    })
      .then(function (response) {
        localStorage.setItem('first_name', response.data.first_name)
        self.user.first_name = response.data.first_name
        localStorage.setItem('last_name', response.data.last_name)
        self.user.last_name = response.data.last_name

        self.login(context, username, password, '/')
      })
      .catch(function (error) {
        context.error = error.response.data.non_field_errors
        console.log(error)
      })
  },

  // To log out, we just need to remove the token
  logout () {
    localStorage.removeItem('token')
    localStorage.removeItem('first_name')
    localStorage.removeItem('last_name')
    this.user.authenticated = false
    router.push('/login')
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
  getAuthHeaders () {
    return {
      'Authorization': 'Token ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  }
}
