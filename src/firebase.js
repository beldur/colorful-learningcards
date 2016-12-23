// @flow

import type { User } from './types'

import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseui from 'firebaseui'

const config = {
  apiKey: "AIzaSyCb0xlBXAYa9mjVlDMC9hSWmyAPntgEAtk",
  authDomain: "colorful-learningcards.firebaseapp.com",
  databaseURL: "https://colorful-learningcards.firebaseio.com",
  storageBucket: "colorful-learningcards.appspot.com",
  messagingSenderId: "377302876686"
}

firebase.initializeApp(config)

export const authUIConfig = {
  signInOptions: [{
    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  }],
}

export const firebaseAuth = firebase.auth()

const authUI = new firebaseui.auth.AuthUI(firebaseAuth)

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
