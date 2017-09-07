  <template>
    <div v-if="task">
      <b-breadcrumb :items="items"/>
      <div>
        <p class="lead">{{ task.lesson.title }}</p>
        <p>{{ task.lesson.about }}</p>
        <b-button v-on:click="nextNode">
          Начать
        </b-button>
      </div>
      <div v-if="currentNodeIndex === task.lesson.nodes.length">
        <h2>Конец</h2>
      </div>
      <div v-else-if="currentBlock">
        <div v-if="currentBlock.polymorphic_ctype.model === 'choiceblock'">
          <choiceblock :block="currentBlock"></choiceblock>
        </div>
        <div v-else-if="currentBlock.polymorphic_ctype.model === 'textblock'">
          <textblock :block="currentBlock"></textblock>
        </div>
        <div v-else-if="currentBlock.polymorphic_ctype.model === 'textanswerblock'">
          <textanswerblock :block="currentBlock"></textanswerblock>
        </div>
        <div v-else-if="currentBlock.polymorphic_ctype.model === 'floatblock'">
          <floatblock :block="currentBlock"></floatblock>
        </div>
        <b-button v-on:click="nextBlock">
          Следующий блок
        </b-button>
      </div>
    </div>
  </template>

  <script>
  import ChoiceBlock from './ChoiceBlock'
  import TextBlock from './TextBlock'
  import TextAnswerBlock from './TextAnswerBlock'
  import FloatBlock from './FloatBlock'

  export default {
    props: {
      pk: {}
    },
    data () {
      return {
        currentNodeIndex: -1,
        currentBlockIndex: 0,
        items: [
          {
            text: 'Tasks',
            href: '/tasks'
          }, {
            text: 'Task',
            active: true
          }
        ]
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
      this.items[1].text = 'Task #' + this.pk
    },
    watch: {
      currentNode: function (currentNode) {
        if (currentNode) {
          this.items[2] = {
            text: currentNode.title,
            active: true
          }
        } else {
          this.items[2] = undefined
        }
      }
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
      'textblock': TextBlock,
      'textanswerblock': TextAnswerBlock,
      'floatblock': FloatBlock
    }
  }
  </script>