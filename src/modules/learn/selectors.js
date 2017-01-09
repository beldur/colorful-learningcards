// @flow

import type { AppState, CardKey } from 'types'

import { getCards } from 'modules/cards/selectors'

export const getNextCardToLearn = (state: AppState): CardKey => {
  const cards = getCards(state)
  const cardKeys = Object.keys(cards.byKey)
  // For now just select randomly a card
  const randomIndex = Math.floor(Math.random() * cardKeys.length)

  return cardKeys[randomIndex]
}
