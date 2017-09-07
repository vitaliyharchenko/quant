  <template>
    <div v-focus>
      <p><b>Вопрос:</b>
        <span v-html="markdown(block.question_text)"></span>
      </p>
      <b-form-group id="InputGroup1"
                  label="Ответ:" label-for="Input1"
                  description="Свободная форма">
        <b-form-input id="Input1"
                      type="text" v-model="answer" required
                      placeholder="Введите ответ"
        >
        </b-form-input>
      </b-form-group>
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
        answer: ''
      }
    },
    methods: {
      markdown: function (value) {
        var md = new MarkdownIt()
        md.use(mk)
        return md.render(value)
      }
    },
    watch: {
      block: function () {
        this.answer = ''
      }
    }
  }
  </script>