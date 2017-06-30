// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

import type { Store } from './types';

// Создаем store для хранения state приложения
const store: Store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log(store);
// рендерим приложение, вложенное в Provider
// Provider Makes the Redux store available to the connect() calls in the component hierarchy below.
// https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react')
);