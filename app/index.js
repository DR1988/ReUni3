import React from 'react'
import ReactDOM from 'react-dom'

import configureStore from './redux/confStore'
import rootSaga from './saga/rootsaga'
import App from './components/App'

const initialState = window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : {}
const store = configureStore(initialState)
store.runSaga(rootSaga)

const rootEl = document.getElementById('root')

ReactDOM.render(
  <div>
    <App store={store} />
  </div>,
  rootEl,
)
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default // eslint-disable-line global-require
    ReactDOM.render(
      <div>
        <NextApp store={store} />
      </div>,
      rootEl,
    )
  })

  module.hot.accept('./saga/rootsaga', () => {
    const nextRootSaga = require('./saga/rootsaga').default // eslint-disable-line global-require
    store.runSaga(nextRootSaga)
  })
}
