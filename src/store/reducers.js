// @flow

import { combineReducers } from 'redux'

import auth from '../modules/auth/reducer'
import cards from '../modules/cards/reducer'

export const makeRootReducer = () => {
  return combineReducers({
    auth,
    cards,
  })
}

export default makeRootReducer
