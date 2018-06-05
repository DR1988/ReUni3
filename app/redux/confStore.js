import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]
  /* if (process.env.NODE_ENV === 'development')*/ middleware.push(createLogger())

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
    ),
  )

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer').default // eslint-disable-line global-require
      store.replaceReducer(nextReducer)
    })
  }

  store.runSaga = sagaMiddleware.run

  return store
}
