// @flow

import type { } from 'types'

import { takeLatest, select, put } from 'redux-saga/effects'
import { ADD_CARDS } from 'modules/cards/reducer'
import { getCards } from 'modules/cards/selectors'
import * as actions from 'modules/learn/reducer'

export function* learnCardsFlow(): Generator<*, *, *> {
  const cards = yield select(getCards)
  const cardKeys = Object.keys(cards.byKey)
  // For now just select randomly a card
  const randomIndex = Math.floor(Math.random() * cardKeys.length)

  yield put(actions.nextCard(cardKeys[randomIndex]))
}

export default function* saga(): Generator<*, *, *> {
  yield [
    takeLatest(ADD_CARDS, learnCardsFlow),
  ]
}
