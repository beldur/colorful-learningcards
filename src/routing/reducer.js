// @flow

import type { Action, ActionHandlers, RouterState } from '../types.js'
import createBrowserHistory from 'history/createBrowserHistory'

const NAME = 'router'
export const NAVIGATE = `${NAME}/NAVIGATE`

const history = createBrowserHistory()

const initialState: RouterState = {
  location: history.location,
  action: history.action,
}

const ACTION_HANDLERS: ActionHandlers<RouterState> = {
  [NAVIGATE]: (state, { location, action }) => ({
    location: location,
    action: action,
  }),
}

export default function reducer(state: RouterState = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action.payload) : state
}

export const navigate = (pathname: string): Action => ({
  type: NAVIGATE,
  payload: {
    location: { pathname, search: '', hash: '' },
    action: 'PUSH'
  },
})
