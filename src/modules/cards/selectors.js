// @flow

import type { AppState, CardsState } from '../../types'

export const getCards = (state: AppState): CardsState =>
  state.cards

export const isCreateOpen = (state: AppState): boolean =>
  getCards(state).createOpen
