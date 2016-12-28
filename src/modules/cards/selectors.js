// @flow

import type { Card, AppState, CardsState } from 'types'

export const getCards = (state: AppState): CardsState =>
  state.cards

export const isCreateOpen = (state: AppState): boolean =>
  getCards(state).createOpen

export const isBusy = (state: AppState): boolean =>
  getCards(state).busy

export const getSortedCardList = (state: AppState): Array<string> =>
  getCards(state).sortedByCreatedAt

export const getCardByKey = (state: AppState, key: string): Card =>
  getCards(state).byKey[key]
