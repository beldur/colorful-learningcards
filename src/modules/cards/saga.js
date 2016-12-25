// @flow

import { takeLatest, take, race, put } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import * as actions from './reducer'

export function* createCardFlow(): Generator<*,*,*> {
  const { createRequested, locationChange } = yield race({
    createRequested: take(actions.CREATE_REQUESTED),
    locationChange: take(LOCATION_CHANGE),
  })

  if (locationChange) {
    yield put(actions.createClose())
  } else if (createRequested) {
    console.log(createRequested)
    try {

    } catch (error) {

    }
    yield put(actions.createClose())
  }
}

export default function* saga(): Generator<*,*,*> {
  yield [
    takeLatest(actions.CREATE_OPEN, createCardFlow),
  ]
}
