  <template>
    <div v-focus>
      <b-card :border-variant="borderVariant">
        <p><b>Вопрос:</b>
          <span v-html="markdown(block.question_text)"></span>
        </p>
        <b-form-group id="InputGroup1"
                    label="Ответ:" label-for="Input1"
                    description="Введите число">
          <b-form-input id="Input1"
                        type="text" v-model="answer" required
                        placeholder="Введите ответ"
          >
          </b-form-input>
        </b-form-group>
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
        answer: undefined
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
    },
    watch: {
      block: function () {
        this.answer = undefined
      },
      answer: function (val) {
        if (val !== undefined) {
          if (isNaN(Number(val))) {
            alert('Введите корректное число')
            this.answer = undefined
          } else {
            if (Number(val) !== 0) {
              this.answer = Number(val)
            }
          }
        }
      }
    },
    computed: {
      borderVariant () {
        var variant = (this.current) ? ('primary') : ('')
        return variant
      }
    }
  }
  </script>