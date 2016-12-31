// @flow

import type { Action } from 'types'

import { channel } from 'redux-saga'
import { takeLatest, take, race, put, select, call, spawn } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import * as actions from './reducer'
import { initialize as initFirebase } from '../firebase'
import * as authSelectors from 'modules/auth/selectors'
import * as authActions from 'modules/auth/reducer'
import { show as showSnackbar } from 'modules/snackbar/reducer'

const { database, TIMESTAMP } = initFirebase()

// createCardFlow defines what happens when the create card view is open
export function* createCardFlow(): Generator<*, *, *> {
  const { createRequested, locationChange } = yield race({
    createRequested: take(actions.CREATE_REQUESTED),
    locationChange: take(LOCATION_CHANGE),
  })

  if (locationChange) {
    yield put(actions.createClose())
  } else if (createRequested) {
    const { payload: { card } } = createRequested
    card.color = parseInt(card.color, 10)

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

export function* loadCardsFlow(): Generator<*, *, *> {
  yield take(authActions.STATE_CHANGED)

  const isAuthenticated = yield select(authSelectors.isAuthenticated)

  if (isAuthenticated) {
    const cardChangedChannel = channel()
    const cardRemovedChannel = channel()
    const user = yield select(authSelectors.getUser)
    const userCardsRef = database.ref(`cards/${user.uid}`)

    yield(put(actions.setBusy(true)))
    const cards = yield new Promise((resolve, reject) => {
      userCardsRef.on('value', (data) => resolve(data.val()))
    })

    yield put(actions.addCards(cards))
    yield put(actions.setBusy(false))

    yield call([userCardsRef, userCardsRef.on], 'child_changed', (data) => {
      cardChangedChannel.put(actions.changedCard(data.key, data.val()))
    })

    yield call([userCardsRef, userCardsRef.on], 'child_removed', (data) => {
      cardRemovedChannel.put(actions.removedCard(data.key, data.val()))
    })

    // Listen for card changes
    while(true) {
      const { changedCard, removedCard } = yield race({
        changedCard: take(cardChangedChannel),
        removedCard: take(cardRemovedChannel),
      })

      if (changedCard) {
        yield put(changedCard)
      } else if (removedCard) {
        yield put(removedCard)
      }
    }
  }
}

export function* deleteCardFlow({ payload }: Action): Generator<*, *, *> {
  const { key } = payload

  const user = yield select(authSelectors.getUser)
  const userCardsRef = database.ref(`cards/${user.uid}/${key}`)

  yield call([userCardsRef, userCardsRef.remove])
}

export default function* saga(): Generator<*, *, *> {
  yield [
    takeLatest(actions.CREATE_OPEN, createCardFlow),
    loadCardsFlow(),
    takeLatest(actions.DELETE_CARD, deleteCardFlow),
  ]
}
