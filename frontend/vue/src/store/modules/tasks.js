import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  byId: {},
  nodes: {},
  blocks: {}
}

// getters
const getters = {
  tasks: state => state.all,
  tasksById: state => state.byId
}

// actions
const actions = {
  getTasks ({ commit }) {
    api.getTasks(tasks => {
      commit(types.RECEIVE_TASKS, { tasks })
    })
  },
  getTask ({ commit }, pk) {
    api.getTask(pk, task => {
      commit(types.RECEIVE_TASK, { task })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_TASKS] (state, { tasks }) {
    state.all = tasks
  },
  [types.RECEIVE_TASK] (state, { task }) {
    state.byId[task.task.id] = task.task
    state.byId[task.task.id].lesson.nodes = Object.keys(task.nodes)
    state.nodes = Object.assign(state.nodes, task.nodes)
    state.blocks = Object.assign(state.blocks, task.blocks)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
