import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
  task: 'task'
}

// getters
const getters = {
  task: state => state.task
}

// actions
const actions = {
  getTask ({ commit }) {
    api.getTask(task => {
      commit(types.RECEIVE_TASK, { task })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_TASK] (state, { task }) {
    console.log(task)
    state.task = task
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
