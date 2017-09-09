  <template>
    <div v-focus>
      <b-card :border-variant="borderVariant">
        <p><b>Вопрос:</b> <span v-html="markdown(block.question_text)"></span></p>
        <div v-for="choice in block.choices">
          <b-form-group id="choices">
            <b-form-checkbox v-model="answer" id="choice.id" :value="choice.id">
              <div v-html="markdown(choice.option_text)"></div>
            </b-form-checkbox>
          </b-form-group>
        </div>
        <b-button v-on:click="endBlock" v-if="current">
          Далее
        </b-button>
      </b-card>
    </div>
  </template>

  <script>
  import MarkdownIt from 'markdown-it'
  import mk from 'markdown-it-katex'

  export default {
    props: {
      block: {},
      current: false
    },
    data () {
      return {
        answer: []
      }
    },
    computed: {
      choicesComputed () {
        return this.answer
      },
      borderVariant () {
        var variant = (this.current) ? ('primary') : ('')
        return variant
      }
    },
    methods: {
      markdown: function (value) {
        var md = new MarkdownIt()
        md.use(mk)
        return md.render(value)
      },
      endBlock: function () {
        this.$emit('finish', this.block, this.answer)
      }
    }
  }
  </script>