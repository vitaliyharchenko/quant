import React from 'react'
import { render } from 'react-dom'
import configureStore from './store'
import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker'
import { loadState, saveState } from './localStorage'

import './index.css'

const persistedState = loadState();

const store = configureStore(persistedState)

store.subscribe(() => {
  saveState(store.getState())
})

render(
	<Root store={store} />,
  document.getElementById('root')
)

registerServiceWorker();
