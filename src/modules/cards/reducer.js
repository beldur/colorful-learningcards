// @flow

import type { Action, CardsState, ActionHandlers, Card, CardKey,  CardList } from 'types'

const NAME = 'cards'
export const CREATE_OPEN = `${NAME}/CREATE_OPEN`
export const CREATE_CLOSE = `${NAME}/CREATE_CLOSE`
export const CREATE_REQUESTED = `${NAME}/CREATE_CARD_REQUESTED`
export const CREATE_SUCCESS = `${NAME}/CREATE_CARD_SUCCESS`
export const CREATE_FAILURE = `${NAME}/CREATE_CARD_FAILURE`
export const CHANGED_CARD = `${NAME}/CHANGED_CARD`
export const REMOVED_CARD = `${NAME}/REMOVED_CARD`
export const ADD_CARDS = `${NAME}/ADD_CARDS`
export const SET_BUSY = `${NAME}/SET_BUSY`
export const DELETE_CARD = `${NAME}/DELETE_CARD`

const initialState: CardsState = {
  createOpen: false,
  busy: false,
  sortedByCreatedAt: [],
  byKey: { },
}

const getSortedKeysByCreatedAt = (cards: CardList) => {
    const byCreatedAt = (a: [CardKey, any], b: [CardKey, any]) => a[1].createdAt > b[1].createdAt ? -1 : 1

    return Object.entries(cards).sort(byCreatedAt).map(([key]) => key)
}

const ACTION_HANDLERS: ActionHandlers<CardsState> = {
  [SET_BUSY]: (state, { busy }) => ({
    ...state,
    busy,
  }),
  [CREATE_OPEN]: (state) => ({
    ...state,
    createOpen: true,
  }),
  [CREATE_CLOSE]: (state) => ({
    ...state,
    createOpen: false,
  }),
  [CREATE_REQUESTED]: (state) => ({
    ...state,
    busy: true,
  }),
  [CREATE_FAILURE]: (state) => ({
    ...state,
    busy: false,
  }),
  [CREATE_SUCCESS]: (state) => ({
    ...state,
    busy: false,
  }),
  [CHANGED_CARD]: (state, { key, card }) => {
    const byKey = {
      ...state.byKey,
      [key]: card,
    }

    return {
      ...state,
      sortedByCreatedAt: getSortedKeysByCreatedAt(byKey),
      byKey,
    }
  },
  [REMOVED_CARD]: (state, { key, card }) => {
    const byKey = {
      ...state.byKey,
    }

    delete byKey[key]

    return {
      ...state,
      sortedByCreatedAt: getSortedKeysByCreatedAt(byKey),
      byKey,
    }
  },
  [ADD_CARDS]: (state, { cards }) => {
    const byKey = {
      ...state.byKey,
      ...cards,
    }

    return {
      ...state,
      sortedByCreatedAt: getSortedKeysByCreatedAt(byKey),
      byKey,
    }
  },
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

export const createFailed = (error: Error): Action => ({
  type: CREATE_FAILURE,
  payload: { error },
})

export const createSuccess = (): Action => ({
  type: CREATE_SUCCESS,
  payload: { },
})

export const changedCard = (key: CardKey, card: Card): Action => ({
  type: CHANGED_CARD,
  payload: { key, card },
})

export const addCards = (cards: CardList): Action => ({
  type: ADD_CARDS,
  payload: { cards },
})

export const setBusy = (busy: boolean): Action => ({
  type: SET_BUSY,
  payload: { busy },
})

export const deleteCard = (key: CardKey): Action => ({
  type: DELETE_CARD,
  payload: { key },
})

export const removedCard = (key: CardKey, card: Card): Action => ({
  type: REMOVED_CARD,
  payload: { key },
})
