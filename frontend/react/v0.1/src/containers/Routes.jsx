import React from 'react'
import { IndexRoute, Route } from 'react-router'
import AppContainer from './AppContainer'
import IndexView from '../views/IndexView';

const routes = <Route path="/" component={AppContainer}>
	<IndexRoute component={IndexView}/>
</Route>

export default routes