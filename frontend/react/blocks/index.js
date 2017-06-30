// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

// Создаем store для хранения state приложения
let store = createStore(reducers);


store.subscribe(() => {console.log(store)});

// рендерим приложение, вложенное в Provider
// Provider Makes the Redux store available to the connect() calls in the component hierarchy below.
// https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react')
);