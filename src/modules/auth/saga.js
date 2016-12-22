import { takeLatest } from 'redux-saga'
import { take, put, apply } from 'redux-saga/effects'
import { firebaseAuth } from '../../firebase.js'
import { navigate } from '../../routing/reducer.js'
import * as actions from './reducer.js'

export function* authFlow({ payload }) {
  const { user } = payload;

  if (user !== null) {
    yield put(actions.loginSuccess())
    yield put(navigate('/learn'))

    yield take(actions.LOGOUT_REQUESTED)

    try {
      yield apply(firebaseAuth, firebaseAuth.signOut)
      yield put(actions.logoutSuccess())
      yield put(navigate('/'))
    } catch(error) {
      yield put(actions.logoutFailed(error))
    }
  }
}

export default function* saga() {
  yield [
    takeLatest(actions.STATE_CHANGED, authFlow),
  ]
}
