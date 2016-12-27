// @flow

import type { User } from 'types'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseui from 'firebaseui'

const config = {
  apiKey: "AIzaSyCb0xlBXAYa9mjVlDMC9hSWmyAPntgEAtk",
  authDomain: "colorful-learningcards.firebaseapp.com",
  databaseURL: "https://colorful-learningcards.firebaseio.com",
  storageBucket: "colorful-learningcards.appspot.com",
  messagingSenderId: "377302876686"
}

const authUIConfig = {
  signInOptions: [{
    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  }],
}

let initialized = false
let auth
let TIMESTAMP
let database
let authUI

export const initialize = () => {
  if (!initialized) {
    firebase.initializeApp(config)

    auth = firebase.auth()
    database = firebase.database()
    TIMESTAMP = firebase.database.ServerValue.TIMESTAMP
    authUI = new firebaseui.auth.AuthUI(auth)

    initialized = true
  }

  return {
    auth,
    TIMESTAMP,
    database,
    authUI,
  }
}

export const firebaseAuthUI = (element: HTMLElement, signInSuccess: (user: User) => void) => {
  authUI.start(element, {
    ...authUIConfig,
    callbacks: {
      signInSuccess: (user) => {
        signInSuccess(user)
        return false
      },
    },
  })
}

export default firebase
