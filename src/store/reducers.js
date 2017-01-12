// @flow

import { combineReducers } from 'redux'

import auth from '../modules/auth/reducer'
import cards from '../modules/cards/reducer'
import snackbar from '../modules/snackbar/reducer'
import learn from '../modules/learn/reducer'

export const makeRootReducer = () => {
  return combineReducers({
    auth,
    cards,
    snackbar,
    learn,
  })
}

export default makeRootReducer
