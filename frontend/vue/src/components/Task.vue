<template>
    <div class="col-sm-6 col-sm-offset-3">
      <h1>Get a Task from local API!</h1>
      <h2>{{ task }}</h2>     
    </div>
  </template>

  <script>
  export default {
    data: function () {
      return {
        response: 'response'
      }
    },
    computed: {
      task () {
        return this.$store.state.tasks.task
      }
    },
    created () {
      this.$store.dispatch('getTask')
    }
  }
  </script>