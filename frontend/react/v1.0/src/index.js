import React from 'react'
import { render } from 'react-dom'
import configureStore from './store'
import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker'

const initialState = {
	tasks: {
		"1": {
			datetime_to: "21/12/1992",
	    	teacher: "МарьИванна",
	    	group: "Супер группа Ф11",
	    	blocks: ["1", "2", "3"]
    	}
	}
}

const store = configureStore(initialState)

render(
	<Root store={store} />,
  document.getElementById('root')
)

registerServiceWorker();
