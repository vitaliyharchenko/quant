<template>
    <div class="col-sm-6 col-sm-offset-3">
      <h1>Get a Token from local API!</h1>
      <button class="btn btn-primary" v-on:click="getTask()">
        Get a Token
      </button>
      <h2>{{ response }}</h2>      
    </div>
  </template>

  <script>
  import axios from 'axios'

  export default {
    data: function () {
      return {
        response: 'response'
      }
    },
    methods: {
      getTask: function () {
        var vm = this

        axios.post('http://localhost/api-token-auth/', {
          username: 'root',
          password: 'quant123456'
        })
          .then(function (response) {
            vm.response = response.data.token
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
  </script>