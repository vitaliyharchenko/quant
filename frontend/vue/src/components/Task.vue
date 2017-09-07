  <template>
    <div v-if="task">
      <b-breadcrumb :items="items"/>
      <div>
        <b-card :title="task.lesson.title">
          <p class="card-text">
            {{ task.lesson.about }}
          </p>
          <a href="#" v-on:click="nextNode"
             class="card-link" v-if="currentNodeIndex === -1">
             Начать
           </a>
        </b-card>
        <br>
      </div>
      <div v-for="(node, key, nodeIndex) in nodes">
        <div v-if="nodeIndex <= currentNodeIndex">
          <b-card bg-variant="info" text-variant="white" class="text-center">
            <p class="card-text">
              {{ node.title }}
            </p>
          </b-card>
          <br>
          <div v-for="(blockId, blockIndex) in node.blocks">
            <div v-if="nodeIndex < currentNodeIndex || blockIndex <= currentBlockIndex">
              <b-card>
                <div v-if="blocks[blockId].polymorphic_ctype.model === 'choiceblock'">
                  <choiceblock :block="blocks[blockId]"></choiceblock>
                </div>
                <div v-else-if="blocks[blockId].polymorphic_ctype.model === 'textblock'">
                  <textblock :block="blocks[blockId]"></textblock>
                </div>
                <div v-else-if="blocks[blockId].polymorphic_ctype.model === 'textanswerblock'">
                  <textanswerblock :block="blocks[blockId]"></textanswerblock>
                </div>
                <div v-else-if="blocks[blockId].polymorphic_ctype.model === 'floatblock'">
                  <floatblock :block="blocks[blockId]"></floatblock>
                </div>
                <b-button v-on:click="nextBlock" v-if="blockIndex === currentBlockIndex">
                  Следующий блок
                </b-button>
              </b-card>
              <br>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentNodeIndex === task.lesson.nodes.length">
        <b-card bg-variant="success"
                text-variant="white"
                header="Конец"
                class="text-center">
          <p class="card-text">Теперь, если нет другой домашки, ты можешь отдохнуть 😉</p>
        </b-card>
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
    methods: {
      // Перейти к следующему вопросу
      nextBlock: function () {
        this.currentBlockIndex++
        // Если такого блока нет - переключаемся на следующую ноду
        if (this.currentBlockIndex === this.nodes[this.task.lesson.nodes[this.currentNodeIndex]].blocks.length) {
          this.nextNode()
        }
      },
      // перейти к следующей node
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