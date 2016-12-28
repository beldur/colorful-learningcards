// @flow

import { channel } from 'redux-saga'
import { takeLatest, take, race, put, select, call, spawn } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import * as actions from './reducer'
import { initialize as initFirebase } from '../firebase'
import * as authSelectors from 'modules/auth/selectors'
import * as authActions from 'modules/auth/reducer'
import { show as showSnackbar } from 'modules/snackbar/reducer'

const { database, TIMESTAMP } = initFirebase()

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
      const { uid } = yield select(authSelectors.getUser)
      const ref = database.ref(`cards/${uid}`)

      card.createdAt = TIMESTAMP

      yield call([ref, ref.push], card)
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

export function* cardListFlow(): Generator<*,*,*> {
  const isAuthenticated = yield select(authSelectors.isAuthenticated)

  if (isAuthenticated) {
    const cardChangedChannel = channel()
    const user = yield select(authSelectors.getUser)
    const userCardsRef = database.ref(`cards/${user.uid}`)

    const cards = yield new Promise((resolve, reject) => {
      userCardsRef.on('value', (data) => resolve(data.val()))
    })

    yield put(actions.addCards(cards))

    yield call([userCardsRef, userCardsRef.on], 'child_changed', (data) => {
      cardChangedChannel.put(actions.changeCard(data.key, data.val()))
    })

    while(true) {
      const changedCard = yield take(cardChangedChannel)
      yield put(changedCard)
    }
  }
}

export default function* saga(): Generator<*,*,*> {
  yield [
    takeLatest(actions.CREATE_OPEN, createCardFlow),
    takeLatest(authActions.STATE_CHANGED, cardListFlow),
  ]
}
