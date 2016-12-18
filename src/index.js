// @flow

import type { User } from './types.js'

import 'react-hot-loader/patch'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import createStore from './store'
import Router from './routing/router'
import Routes from './routing/routes'
import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'
import { firebaseAuth } from './firebase.js'
import { authStateChanged } from './modules/auth/reducer.js'

import './index.css'

const store = createStore()

firebaseAuth.onAuthStateChanged((user?: User) => store.dispatch(authStateChanged(user)))

const render = (Routes) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          {Routes}
        </Router>
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
