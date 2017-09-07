import Vue from 'Vue'
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
    api.getTasks(function (tasks) {
      commit(types.RECEIVE_TASKS, { tasks })
    })
  },
  getTask ({ commit }, pk) {
    api.getTask(pk, function (task) {
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
    // We shoul use Vue.set for detect changes in array
    // https://vuejs.org/v2/guide/list.html#Caveats
    var newTask = task.task
    Vue.set(state.byId, task.task.id, newTask)

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
