  <template>
    <div>
      <h2>
        {{ block.title }}
      </h2>
      <p>{{ block.body }}</p>
    </div>
  </template>

  <script>
  export default {
    props: {
      block: {}
    }
  }
  </script>