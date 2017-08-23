<template>
    <div class="col-sm-6 col-sm-offset-3">
      <h1>Get a API call from Yesno!</h1>
      <button class="btn btn-primary" v-on:click="getQuote()">
        Get a Quote
      </button>
      <h2>{{ quote }}</h2>      
    </div>
  </template>

  <script>
  import axios from 'axios'

  export default {
    data: function () {
      return {
        quote: 'quote'
      }
    },
    methods: {
      getQuote: function () {
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.quote = response.data.answer.toString()
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
  </script>