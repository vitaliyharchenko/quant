import React from 'react'
import { render } from 'react-dom' // рендерит компоненты
import { createStore } from 'redux'
import { browserHistory } from 'react-router' // дает возможность ходить по истории посещения в браузере
import { syncHistoryWithStore } from 'react-router-redux' // хранит информацию о посещенных страницах в store
import Root from './containers/Root' // базовый компонет приложения

const store = createStore() // создаем store
const history = syncHistoryWithStore(browserHistory, store) // подключаем историю роутинга

// рендерим корневой компонент приложения и передаем ему store, history of router
render(
  <Root store={store} history={history} />,
  document.getElementById('react')
)