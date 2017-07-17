// ACTION CONST

const NEXT_BLOCK = 'NEXT_BLOCK'

// ACTION CREATORS

function nextBlock() {
  return {
    type: NEXT_BLOCK
  }
}

// REDUCERS

function taskApp(state = [], action) {
  switch (action.type) {
    case NEXT_BLOCK:
      return Object.assign({}, state, {
        currentBlockNumber: state.currentBlockNumber+1
      })
    default:
      return state
  }
}

export default taskApp;