  <template>
    <div class="col-sm-6 col-sm-offset-3">
      <h1>Task!</h1>
      Task #{{ pk }}
      <p>{{ task }}</p>
    </div>
  </template>

  <script>
  export default {
    props: {
      pk: {
        type: String,
        default: ''
      }
    },
    computed: {
      task () {
        return this.$store.getters.currentTask
      }
    },
    created () {
      this.$store.dispatch('getTask', this.pk)
    }
  }
  </script>