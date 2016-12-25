// @flow

import type { Action, CardsState, ActionHandlers, Card } from '../../types'

const NAME = 'cards'
export const CREATE_OPEN = `${NAME}/CREATE_OPEN`
export const CREATE_CLOSE = `${NAME}/CREATE_CLOSE`
export const CREATE_REQUESTED = `${NAME}/CREATE_CARD_REQUESTED`
export const CREATE_SUCCESS = `${NAME}/CREATE_CARD_SUCCESS`
export const CREATE_FAILURE = `${NAME}/CREATE_CARD_FAILURE`

const initialState: CardsState = {
  createOpen: false,
}

const ACTION_HANDLERS: ActionHandlers<CardsState> = {
  [CREATE_OPEN]: (state) => ({
    ...state,
    createOpen: true,
  }),
  [CREATE_CLOSE]: (state) => ({
    ...state,
    createOpen: false,
  }),
}

export default function reducer(state: CardsState = initialState, action: Action) {
  const handler = action && ACTION_HANDLERS[action.type]

  return handler ? handler(state, action.payload) : state
}

export const createOpen = (): Action => ({
  type: CREATE_OPEN,
  payload: { },
})

export const createClose = (): Action => ({
  type: CREATE_CLOSE,
  payload: { },
})

export const createRequested = (card: Card): Action => ({
  type: CREATE_REQUESTED,
  payload: { card },
})
