import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

const rootEl = document.getElementById('root')

ReactDOM.render(
  <App />,
  rootEl,
)
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default // eslint-disable-line global-require
    ReactDOM.render(
      <NextApp />,
      rootEl,
    )
  })
}
