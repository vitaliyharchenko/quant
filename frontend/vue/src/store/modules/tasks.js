import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  current: {}
}

// getters
const getters = {
  tasks: state => state.all,
  currentTask: state => state.current
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
    state.current = task
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
