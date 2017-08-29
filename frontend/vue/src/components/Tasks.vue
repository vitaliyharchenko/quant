<template>
    <div class="col-sm-6 col-sm-offset-3">
      <h1>Tasks!</h1>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <ul>
        <li v-for="task in tasks">
          Д\з к уроку на тему "{{ task.lesson.title }}" ({{ task.lesson.subject_tag.title }})
          <router-link :to="{ name: 'task', params: { pk: task.id }}">Ссылка</router-link>
        </li>
      </ul>    
    </div>
  </template>

  <script>
  export default {
    data () {
      return {
        error: ''
      }
    },
    computed: {
      tasks () {
        return this.$store.getters.tasks
      }
    },
    created () {
      this.$store.dispatch('getTasks')
    }
  }
  </script>