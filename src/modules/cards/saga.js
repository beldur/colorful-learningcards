// @flow

import { takeLatest, take, race, put, select, call, spawn } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import * as actions from './reducer'
import { database, TIMESTAMP } from '../firebase'
import { getUserId } from 'modules/auth/selectors'
import { show as showSnackbar } from 'modules/snackbar/reducer'

export function* createCardFlow(): Generator<*,*,*> {
  const { createRequested, locationChange } = yield race({
    createRequested: take(actions.CREATE_REQUESTED),
    locationChange: take(LOCATION_CHANGE),
  })

  if (locationChange) {
    yield put(actions.createClose())
  } else if (createRequested) {
    const { payload: { card } } = createRequested

    try {
      const uid = yield select(getUserId)
      const ref = database.ref(`cards/${uid}/${card.uuid}`)

      card.createdAt = TIMESTAMP

      yield call([ref, ref.set], card)
      yield put(actions.createSuccess())
      yield put(actions.createClose())
      yield put(showSnackbar('Card created successfully'))
    } catch (error) {
      yield put(actions.createFailed(error))
      yield put(showSnackbar('Error creating card'))
      yield spawn(createCardFlow)
    }
  }
}

export default function* saga(): Generator<*,*,*> {
  yield [
    takeLatest(actions.CREATE_OPEN, createCardFlow),
  ]
}
