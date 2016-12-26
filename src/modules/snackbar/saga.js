// @flow

import { takeLatest, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { put } from 'redux-saga/effects'
import * as actions from './reducer'

export function* snackbarFlow(): Generator<*,*,*> {
  yield call(delay, 4000)
  yield put(actions.hide())
}

export default function* saga(): Generator<*,*,*> {
  yield [
    takeLatest(actions.SHOW, snackbarFlow),
  ]
}
