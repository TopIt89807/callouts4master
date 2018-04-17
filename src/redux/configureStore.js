import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const history = createHistory()

function configureStore(initialState = {}) {
  // Middlewares and store enhancers
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  // Add redux dev tool extension
  if (process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering during development.
    if (window.devToolsExtension) {
      enhancers.push(window.devToolsExtension())
    }
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  )

  // Extensions
  store.runSaga = sagaMiddleware.run
  store.history = history

  return store
}

export default configureStore