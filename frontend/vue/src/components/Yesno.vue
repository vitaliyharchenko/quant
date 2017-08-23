<template>
    <div class="col-sm-6 col-sm-offset-3">
      <h1>Get a API call from Yesno!</h1>
      <button class="btn btn-primary" v-on:click="getQuote()">
        Get a Answer
      </button>
      <h2>{{ answer }}</h2>      
    </div>
  </template>

  <script>
  import axios from 'axios'

  export default {
    data: function () {
      return {
        answer: 'answer'
      }
    },
    methods: {
      getQuote: function () {
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = response.data.answer.toString()
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
  </script>