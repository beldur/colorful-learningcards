// @flow

import type { Action, LearnState, CardKey, ActionHandlers } from 'types'

const NAME = 'learn'
export const SET_NEXT_CARD = `${NAME}/SET_NEXT_CARD`

const initialState: LearnState = {
  nextCardKey: null,
}

const ACTION_HANDLERS: ActionHandlers<LearnState> = {
  [SET_NEXT_CARD]: (state, { cardKey }) => ({
    ...state,
    nextCardKey: cardKey,
  }),
}

export default function reducer(state: LearnState = initialState, action: Action) {
  const handler = action && ACTION_HANDLERS[action.type]

  return handler ? handler(state, action.payload) : state
}

export const nextCard = (cardKey: CardKey): Action => ({
  type: SET_NEXT_CARD,
  payload: { cardKey },
})
