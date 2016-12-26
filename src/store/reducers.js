// @flow

import { combineReducers } from 'redux'

import auth from '../modules/auth/reducer'
import cards from '../modules/cards/reducer'
import snackbar from '../modules/snackbar/reducer'

export const makeRootReducer = () => {
  return combineReducers({
    auth,
    cards,
    snackbar,
  })
}

export default makeRootReducer
