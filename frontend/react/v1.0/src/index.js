import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Task from './components/Task'
import Main from './components/Main'
import store from './store'
import registerServiceWorker from './registerServiceWorker'

render(
  <Provider store={store}>
  	<BrowserRouter>
			<div>
				<ul>
	        <li><Link to="/">Home</Link></li>
	        <li><Link to="/tasks/1">FirstBlock</Link></li>
	      </ul>
				<Route exact path='/' component={Main} />
				<Route path='/tasks/:task_id' component={Task} />
			</div>
  	</BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
