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
            'Authorization': 'Token 0d48cb09b991eebf8386b8714dbb851ca399aa9e',
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