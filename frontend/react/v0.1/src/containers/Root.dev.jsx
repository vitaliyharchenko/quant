import React from 'react'
import PropTypes from 'prop-types' // typechecking from facebook
import { Provider } from 'react-redux' // предоставляет всем дочерним элементам доступ к store
import routes from './Routes' // пути в приложении
import DevTools from './DevTools'
import { Router } from 'react-router' // корневой root компонент

const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      <DevTools />
    </div>
  </Provider>
)

// проверка типов аргументов компонента
Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root