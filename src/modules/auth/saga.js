import { takeLatest } from 'redux-saga'
import { take, put, apply, race } from 'redux-saga/effects'
import { firebaseAuth } from '../../firebase.js'
import { navigate } from '../../routing/reducer.js'
import * as actions from './reducer.js'

export function* authFlow() {
  const { loginSuccess, logoutRequested } = yield race({
    loginSuccess: take(actions.LOGIN_SUCCESS),
    logoutRequested: take(actions.LOGOUT_REQUESTED),
  })

  if (logoutRequested) {
    try {
      yield apply(firebaseAuth, firebaseAuth.signOut)
      yield put(actions.logoutSuccess())
      yield put(navigate('/'))
    } catch(error) {
      yield put(actions.logoutFailed(error))
    }
  } else if (loginSuccess) {
      yield put(navigate('/learn'))
  }
}

export default function* saga() {
  yield [
    takeLatest(actions.STATE_CHANGED, authFlow),
  ]
}
