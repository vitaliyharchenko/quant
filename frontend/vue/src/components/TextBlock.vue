  <template>
    <div v-focus>
      <h2>
        {{ block.title }} <small><b-badge>Теория</b-badge></small>
      </h2>
      <div v-html="compiledMarkdown" id="markdown"></div>
    </div>
  </template>

  <script>
  import MarkdownIt from 'markdown-it'
  import mk from 'markdown-it-katex'

  export default {
    props: {
      block: {}
    },
    data () {
      return {
        answer: true
      }
    },
    created: function () {
      var md = new MarkdownIt()
      md.use(mk)
      var result = md.render('# Math Rulez! \n  $\\sqrt{3x-1}+(1+x)^2$')
      this.result = result
    },
    computed: {
      compiledMarkdown: function () {
        var md = new MarkdownIt()
        md.use(mk)
        return md.render(this.block.body)
      }
    }
  }
  </script>

  <style>
    img {
      max-width: 100%;
    }
  </style>