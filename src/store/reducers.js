// @flow

import { combineReducers } from 'redux'
import router from '../routing/reducer.js'
import auth from '../modules/auth/reducer.js'

export const makeRootReducer = () => {
  return combineReducers({
    router,
    auth,
  })
}

export default makeRootReducer
