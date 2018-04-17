import React from 'react'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'

import Root from 'modules/App'
import './styles/styles.css'
import 'react-notifications/lib/notifications.css'

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={store.history}>
        <Route path="/" component={Root} />
      </ConnectedRouter>
    </Provider>
  )
}

export default App
