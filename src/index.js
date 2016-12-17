// @flow

import 'react-hot-loader/patch'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import firebase from 'firebase/app';
import 'firebase/auth';
import createStore from './store'
import Router from './routing/router'
import Routes from './routing/routes'
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

import './index.css'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCb0xlBXAYa9mjVlDMC9hSWmyAPntgEAtk",
  authDomain: "colorful-learningcards.firebaseapp.com",
  databaseURL: "https://colorful-learningcards.firebaseio.com",
  storageBucket: "colorful-learningcards.appspot.com",
  messagingSenderId: "377302876686"
}
const firebaseApp = firebase.initializeApp(config)
console.log(firebaseApp);

console.log(firebase.auth().currentUser)
firebase.auth().onAuthStateChanged(user => {

});

const store = createStore({
  auth: { authenticated: true }
})

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
