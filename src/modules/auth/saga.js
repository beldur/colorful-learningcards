// @flow

import { takeLatest } from 'redux-saga/effects'
import { take, put, apply, race } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { firebaseAuth } from '../../firebase'
import * as actions from './reducer'

export function* authFlow(): Generator<*,*,*> {
  const { loginSuccess, logoutRequested } = yield race({
    loginSuccess: take(actions.LOGIN_SUCCESS),
    logoutRequested: take(actions.LOGOUT_REQUESTED),
  })

  if (logoutRequested) {
    try {
      yield apply(firebaseAuth, firebaseAuth.signOut)
      yield put(actions.logoutSuccess())
      yield put(push('/'))
    } catch(error) {
      yield put(actions.logoutFailed(error))
    }
  } else if (loginSuccess) {
      yield put(push('/learn'))
  }
}

export default function* saga(): Generator<*,*,*> {
  yield [
    takeLatest(actions.STATE_CHANGED, authFlow),
  ]
}
