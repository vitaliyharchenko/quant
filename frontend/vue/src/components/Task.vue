  <template>
    <div v-if="task">
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
                  <choiceblock :block="currentBlock"></choiceblock>
                </div>
                <div v-else-if="currentBlock.polymorphic_ctype.model === 'textblock'">
                  <textblock :block="currentBlock"></textblock>
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
  import ChoiceBlock from './ChoiceBlock'
  import TextBlock from './TextBlock'

  export default {
    props: {
      pk: {}
    },
    data () {
      return {
        currentNodeIndex: -1,
        currentBlockIndex: 0,
        results: {}
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
        if (this.currentNodeIndex === -1) {
          return undefined
        } else {
          return this.$store.state.tasks.nodes[this.$store.state.tasks.byId[this.pk].lesson.nodes[this.currentNodeIndex]]
        }
      },
      currentBlock () {
        if (this.currentNodeIndex === -1) {
          return undefined
        } else {
          return this.$store.state.tasks.blocks[this.currentNode.blocks[this.currentBlockIndex]]
        }
      }
    },
    created () {
      this.$store.dispatch('getTask', this.pk)
    },
    mounted () {
      var blocksIds = Object.keys(this.blocks)
      console.log(blocksIds)
      var resultsObj = {}
      for (var i in blocksIds) {
        resultsObj[blocksIds[i]] = {}
      }
      console.log(resultsObj)
      this.results = Object.assign({}, this.results, resultsObj)
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
    },
    components: {
      'choiceblock': ChoiceBlock,
      'textblock': TextBlock
    }
  }
  </script>