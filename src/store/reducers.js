// @flow

import { combineReducers } from 'redux'

import auth from '../modules/auth/reducer'

export const makeRootReducer = () => {
  return combineReducers({
    auth,
  })
}

export default makeRootReducer
