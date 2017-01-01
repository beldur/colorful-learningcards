// @flow

import type { Card, AppState, CardsState, CardKey } from 'types'

export const getCards = (state: AppState): CardsState =>
  state.cards

export const isCreateOpen = (state: AppState): boolean =>
  getCards(state).createOpen

export const isBusy = (state: AppState): boolean =>
  getCards(state).busy

export const getSortedCardList = (state: AppState): Array<string> =>
  getCards(state).sortedByCreatedAt

export const getCardByKey = (state: AppState, key: CardKey): Card =>
  getCards(state).byKey[key]

export const hasCardByKey = (state: AppState, key: CardKey): boolean =>
  !!getCardByKey(state, key)

export const getSelectedCards = (state: AppState): Array<CardKey> =>
  getCards(state).selected

export const hasSelectedCards = (state: AppState): boolean =>
  getSelectedCards(state).length > 0

export const isSelected = (state: AppState, key: CardKey): boolean =>
  getSelectedCards(state).indexOf(key) > -1
