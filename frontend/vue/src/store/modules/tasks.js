import Vue from 'Vue'
import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  byId: {},
  nodes: {},
  blocks: {},
  results: {}
}

// getters
const getters = {
  tasks: state => state.all,
  tasksById: state => state.byId,
  results: state => state.results
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
  },
  sendTaskResults ({commit}, data) {
    var task = data[0]
    var results = data[1]
    api.sendTaskResults(task, results, function (response) {
      console.log('Sended results!')
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
  },
  [types.SET_BLOCK_RESULT] (state, { task }) {
    // We shoul use Vue.set for detect changes in array
    // https://vuejs.org/v2/guide/list.html#Caveats
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
