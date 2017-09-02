  <template>
    <div class="col-sm-6 col-sm-offset-3">
      <p>Задание #{{ pk }}</p>
      <hr>
      <div v-if="currentNodeIndex === -1">
        <p>{{ task.lesson.title }}</p>
        <p>{{ task.lesson.about }}</p>
        <button v-on:click="nextNode">
          Начать
        </button>
      </div>
      <div v-else-if="currentNodeIndex === task.lesson.nodes.length">
        <h2>Конец</h2>
      </div>
      <div v-else>
        <ul>
          <li>
            Тема: {{ currentNode.title }}
            <ul>
              <li>
                <div v-if="currentBlock.polymorphic_ctype.model === 'choiceblock'">
                  <p>Вопрос: {{ currentBlock.question_text }}</p>
                  <ul>
                    <li v-for="choice in currentBlock.choices">
                      <label>
                        <input id="checkBox" type="checkbox"> {{ choice.option_text }} is_true:{{ choice.is_true }}
                      </label>
                    </li>
                  </ul>
                </div>
                <div v-else-if="currentBlock.polymorphic_ctype.model === 'textblock'">
                  <h2>
                    {{ currentBlock.title }}
                  </h2>
                  <p>{{ currentBlock.body }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <button v-on:click="nextBlock">
          Следующий блок
        </button>
      </div>
    </div>
  </template>

  <script>
  export default {
    props: {
      pk: {
        type: String
      }
    },
    data () {
      return {
        currentNodeIndex: -1,
        currentBlockIndex: 0
      }
    },
    computed: {
      task () {
        return this.$store.state.tasks.byId[this.pk]
      },
      nodes () {
        return this.$store.state.tasks.nodes
      },
      blocks () {
        return this.$store.state.tasks.blocks
      },
      currentNode () {
        return this.nodes[this.task.lesson.nodes[this.currentNodeIndex]]
      },
      currentBlock () {
        return this.blocks[this.currentNode.blocks[this.currentBlockIndex]]
      }
    },
    created () {
      this.$store.dispatch('getTask', this.pk)
    },
    methods: {
      // Перейти к следующему вопросу
      nextBlock: function () {
        this.currentBlockIndex++
        // Если такого блока нет - переключаемся на следующую ноду
        if (this.currentBlockIndex === this.nodes[this.task.lesson.nodes[this.currentNodeIndex]].blocks.length) {
          this.nextNode()
        }
      },
      nextNode: function () {
        this.currentBlockIndex = 0
        this.currentNodeIndex++
        // Пока нода пустая - идем дальше, если ноды нет - не делаем ничего, это конец
        if (this.nodes[this.task.lesson.nodes[this.currentNodeIndex]] !== undefined) {
          if (this.nodes[this.task.lesson.nodes[this.currentNodeIndex]].blocks.length === 0) {
            this.nextNode()
          }
        }
      }
    }
  }
  </script>