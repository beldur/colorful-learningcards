// @flow

import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { makeRootReducer } from './reducers'
import sagas from './sagas'

export default (initialState: Object = {}) => {
  const rootReducer = makeRootReducer()
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [sagaMiddleware]
  const enhancers = []

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  )

  sagaMiddleware.run(sagas)

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     console.log('replace Reducer')
  //     const reducers = require('./reducers').default
  //     store.replaceReducer(reducers)
  //   })
  // }

  return store
}
