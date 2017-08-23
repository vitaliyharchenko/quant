<template>
    <div class="col-sm-6 col-sm-offset-3">
      <h1>Get a Task from local API!</h1>
      <button class="btn btn-primary" v-on:click="getTask()">
        Get a Task
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

        axios.get('http://localhost/api/tasks/', {
          headers: {
            'Authorization': 'Token 21d5af1eea22b40cb908ebe433cb09faacd1ac5a',
            'Content-Type': 'application/json'
          }
        })
          .then(function (response) {
            vm.response = response
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
  </script>