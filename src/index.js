// @flow

import type { User } from './types'

import 'react-hot-loader/patch'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createStore from './store'
import Routes from './routing/routes'
import { initialize as initFirebase } from './modules/firebase'
import { stateChanged } from './modules/auth/reducer'

import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material'

import './index.css'

const history = createBrowserHistory()
const store = createStore({}, history)

const { auth } = initFirebase()
auth.onAuthStateChanged((user?: User) => store.dispatch(stateChanged(user)))

const render = (Routes) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {Routes}
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(<Routes />)

if (process.env.NODE_ENV === 'development' && module.hot) {
  // $FlowFixMe
  module.hot.accept('./routing/routes', () => {
    const NextRoutes = require('./routing/routes').default
    render(<NextRoutes />)
  })
}
