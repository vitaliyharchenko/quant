<template>
  <div class="col-sm-6 col-sm-offset-3">
    <h1>Get a task!</h1>
    <button class="btn btn-primary" v-on:click="getTask()">Get a Task</button>
    <div class="task-area" v-if="task">
      <h2><blockquote>{{ task }}</blockquote></h2>      
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      task: ''
    }
  },
  methods: {
    getTask () {
      this.$http
        .get('http://localhost/api/tasks', (data) => {
          this.task = data
        })
        .error((err) => console.log(err))
    }
  }
}
</script>