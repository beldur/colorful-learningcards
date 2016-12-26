// @flow

import type { Action, SnackbarState, ActionHandlers } from 'types'

const NAME = 'snackbar'
export const SHOW = `${NAME}/SHOW`
export const HIDE = `${NAME}/HIDE`

const initialState: SnackbarState = {
  isVisible: false,
  text: '',
}

const ACTION_HANDLERS: ActionHandlers<SnackbarState> = {
  [SHOW]: (state, { text }) => ({
    ...state,
    isVisible: true,
    text,
  }),
  [HIDE]: (state) => ({
    ...state,
    isVisible: false,
    text: '',
  }),
}

export default function reducer(state: SnackbarState = initialState, action: Action) {
  const handler = action && ACTION_HANDLERS[action.type]

  return handler ? handler(state, action.payload) : state
}

export const show = (text: string): Action => ({
  type: SHOW,
  payload: { text },
})

export const hide = (): Action => ({
  type: HIDE,
  payload: { },
})
