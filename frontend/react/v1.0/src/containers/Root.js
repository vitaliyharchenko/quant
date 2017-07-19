import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import DevTools from './DevTools'

import 'bootstrap/dist/css/bootstrap.css'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

import Task from '../components/Task'
import Main from '../components/Main'
import Login from '../components/Login'

var auth = require('../auth')

class Root extends Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	logoutHandler() {
        auth.logout()
    }

	render() {

		const isLoggedIn = auth.loggedIn()

		return (
			<Provider store={this.props.store}>
				<div>
					<BrowserRouter>
						<div>
							<Navbar inverse toggleable fixed="top">
								<NavbarToggler right onClick={this.toggle} />
								<NavbarBrand href="/app">QUANT</NavbarBrand>
								<Collapse isOpen={this.state.isOpen} navbar>
									<Nav className="ml-auto" navbar>
										{isLoggedIn === true
							                ? <NavItem><NavLink href="/app/login" onClick={this.logoutHandler}>Logout</NavLink></NavItem>
							                : <NavItem><NavLink href="/app/login">Login</NavLink></NavItem>
							            }
										<NavItem>
											<NavLink href="/app/tasks/1">First Block</NavLink>
										</NavItem>
									</Nav>
								</Collapse>
							</Navbar>

							<Route exact path='/app' component={Main} />
							<Route path='/app/tasks/:task_id' component={Task} />
							<Route path='/app/login' component={Login} />
						</div>
					</BrowserRouter>
					<DevTools />
				</div>
			</Provider>
		)
	}
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  fixed: PropTypes.string
}

export default Root