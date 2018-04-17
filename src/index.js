import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import configureStore from './redux/configureStore'
import sagas from './redux/sagas'

// Initialize store
const store = configureStore(window.__INITIAL_STATE__)
sagas.forEach(saga => store.runSaga(saga))

const mountApp = document.getElementById('root')

ReactDOM.render(
  <App store={store}/>,
  mountApp
)

registerServiceWorker()
