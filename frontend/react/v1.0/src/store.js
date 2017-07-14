import { createStore } from 'redux'
import taskApp from './reducers'

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

const store = createStore(taskApp, initialState)

export default store