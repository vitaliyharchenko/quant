import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import DevTools from './DevTools'

import 'bootstrap/dist/css/bootstrap.css';

import Task from '../components/Task'
import Main from '../components/Main'
import Login from '../components/Login'

const Root = ({ store }) => (
	<Provider store={store}>
		<div>
			<BrowserRouter>
				<div>
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/tasks/1">FirstBlock</Link></li>
					</ul>
					<Route exact path='/' component={Main} />
					<Route path='/tasks/:task_id' component={Task} />
					<Route path='/login' component={Login} />
				</div>
			</BrowserRouter>
			<DevTools />
		</div>
	</Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root