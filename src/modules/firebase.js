// @flow

import type { User } from 'types'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import firebaseui from 'firebaseui'

const config = {
  apiKey: "AIzaSyCb0xlBXAYa9mjVlDMC9hSWmyAPntgEAtk", // Auth / General Use
  authDomain: "colorful-learningcards.firebaseapp.com", // Auth with popup/redirect
  databaseURL: "https://colorful-learningcards.firebaseio.com", // Realtime Database
  storageBucket: "colorful-learningcards.appspot.com", // Storage
  messagingSenderId: "377302876686", // Storage
}

const authUIConfig = {
  signInOptions: [{
    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  }],
}

let auth
let TIMESTAMP
let database
let authUI

export const initialize = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(config)

    auth = firebase.auth()
    database = firebase.database()
    TIMESTAMP = firebase.database.ServerValue.TIMESTAMP
    authUI = new firebaseui.auth.AuthUI(auth)
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
