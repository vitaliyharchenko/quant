  <template>
    <div v-focus>
      <b-card :border-variant="borderVariant">
        <p><b>Вопрос:</b>
          <span v-html="markdown(block.question_text)"></span>
        </p>
        <b-form-group id="InputGroup1"
                    label="Ответ:" label-for="Input1"
                    description="Число">
          <b-form-input id="Input1"
                        type="text" v-model.number="answer" required
                        :state="nameState"
                        placeholder="Введите ответ"
          >
          </b-form-input>
          <b-form-feedback v-if="error">
            {{ error }}
          </b-form-feedback>
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
        answer: '',
        error: ''
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
        if (isNaN(Number(val))) {
          this.error = 'Введите корректное число'
        } else {
          this.error = undefined
        }
      }
    },
    computed: {
      borderVariant () {
        var variant = (this.current) ? ('primary') : ('')
        return variant
      },
      nameState () {
        return !isNaN(Number(this.answer)) ? null : 'invalid'
      }
    }
  }
  </script>