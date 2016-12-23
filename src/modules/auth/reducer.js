// @flow

import type { Action, AuthState, User, ActionHandlers } from '../../types.js'

const NAME = 'auth'
export const STATE_CHANGED = `${NAME}/STATE_CHANGED`
export const LOGOUT_REQUESTED = `${NAME}/LOGOUT_REQUESTED`
export const LOGOUT_SUCCESS = `${NAME}/LOGOUT_SUCCESS`
export const LOGOUT_FAILED = `${NAME}/LOGOUT_FAILED`
export const LOGIN_SUCCESS = `${NAME}/LOGIN_SUCCESS`

const initialState: AuthState = {
  authenticated: false,
  user: null,
}

const ACTION_HANDLERS: ActionHandlers<AuthState> = {
  [STATE_CHANGED]: (state, { user }) => ({
    authenticated: !!user,
    user: user || null,
  }),
  [LOGIN_SUCCESS]: (state, { user }) => ({
    authenticated: !!user,
    user: user || null,
  }),
  [LOGOUT_SUCCESS]: (state) => ({
    authenticated: false,
    user: null,
  }),
}

export default function reducer(state: AuthState = initialState, action: Action) {
  const handler = action && ACTION_HANDLERS[action.type]

  return handler ? handler(state, action.payload) : state
}

export const stateChanged = (user?: User): Action => ({
  type: STATE_CHANGED,
  payload: { user },
})

export const logout = (): Action => ({
  type: LOGOUT_REQUESTED,
  payload: {},
})

export const logoutFailed = (error: any): Action => ({
  type: LOGOUT_FAILED,
  payload: { error },
})

export const logoutSuccess = () : Action => ({
  type: LOGOUT_SUCCESS,
  payload: { },
})

export const loginSuccess = (user: User) : Action => ({
  type: LOGIN_SUCCESS,
  payload: { user },
})
