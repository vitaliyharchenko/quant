// ACTION CONST

const NEXT_BLOCK = 'NEXT_BLOCK'

// ACTION CREATORS

export function nextBlock() {
  return {
    type: NEXT_BLOCK
  }
}

// REDUCERS

function taskApp(state = [], action) {
  switch (action.type) {
    case NEXT_BLOCK:
      return Object.assign({}, state, {
        ui: {
          currentBlock: state.ui.currentBlock+1
        }
      })
    default:
      return state
  }
}

export default taskApp;