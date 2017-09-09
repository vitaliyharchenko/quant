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
      </div>
      <div v-for="(nodeId, nodeIndex) in task.lesson.nodes">
        <div v-if="nodeIndex <= currentNodeIndex">
          <b-card bg-variant="info"
                  text-variant="white"
                  class="text-center">
            <p class="card-text">
              Тема {{ nodeIndex+1 }}. {{ nodes[nodeId].title }}
            </p>
          </b-card>
          <div v-for="(blockId, blockIndex) in nodes[nodeId].blocks">
            <div v-if="nodeIndex < currentNodeIndex || blockIndex <= currentBlockIndex">
              <div v-if="blocks[blockId].polymorphic_ctype.model === 'choiceblock'">
                <choiceblock :block="blocks[blockId]"
                    v-on:finish="finishBlock"
                    :current="isCurrentBlock(blockId)">
                </choiceblock>
              </div>
              <div v-else-if="blocks[blockId].polymorphic_ctype.model === 'textblock'">
                <textblock :block="blocks[blockId]"
                    v-on:finish="finishBlock"
                    :current="isCurrentBlock(blockId)">
                </textblock>
              </div>
              <div v-else-if="blocks[blockId].polymorphic_ctype.model === 'textanswerblock'">
                <textanswerblock :block="blocks[blockId]"
                    v-on:finish="finishBlock"
                    :current="isCurrentBlock(blockId)">
                </textanswerblock>
              </div>
              <div v-else-if="blocks[blockId].polymorphic_ctype.model === 'floatblock'">
                <floatblock :block="blocks[blockId]"
                    v-on:finish="finishBlock"
                    :current="isCurrentBlock(blockId)">
                </floatblock>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentNodeIndex === task.lesson.nodes.length">
        <b-card bg-variant="success"
                text-variant="white"
                header="Конец"
                class="text-center"
                v-focus>
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
        ],
        results: {
          blocks: {}
        }
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
        } else if (!this.currentNode) {
          return undefined
        } else {
          var blockId = this.currentNode.blocks[this.currentBlockIndex]
          return this.$store.state.tasks.blocks[blockId]
        }
      }
    },
    created () {
      this.$store.dispatch('getTask', this.pk)
      this.items[1].text = 'Task #' + this.pk
    },
    methods: {
      // вызывается, когда оканчивается какой-то блок для обработки ответа
      finishBlock: function (block, answer) {
        this.results.blocks[block.id] = {
          answer: answer
        }
        this.nextBlock()
      },
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
          // tckb нода пустая - мотаем дальше
          if (this.nodes[this.task.lesson.nodes[this.currentNodeIndex]].blocks.length === 0) {
            this.nextNode()
          }
        } else {
          console.log('Конец')
          console.log(this.results)
          this.$store.dispatch('sendTaskResults', [this.task, this.results])
        }
      },
      isCurrentBlock: function (blockId) {
        if (this.blocks[blockId] === this.currentBlock) {
          return true
        } else {
          return false
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

  <style>
    .card {
      margin-bottom: 30px;
    }
  </style>