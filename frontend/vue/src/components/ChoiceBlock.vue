  <template>
    <div>
      <p>Вопрос: {{ block.question_text }}</p>
      <p>{{ choicesComputed }}</p>
      <ul>
        <li v-for="choice in block.choices">
          <label>
            <input id="choice.id" :value="choice.id" type="checkbox"
            v-model="choices"> {{ choice.option_text }} is_true:{{ choice.is_true }}
          </label>
        </li>
      </ul>
    </div>
  </template>

  <script>
  export default {
    props: {
      block: {}
    },
    data () {
      return {
        choices: []
      }
    },
    computed: {
      choicesComputed () {
        return this.choices
      }
    }
  }
  </script>