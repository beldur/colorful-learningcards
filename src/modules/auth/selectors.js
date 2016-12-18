// @flow

import type { AppState, AuthState } from '../../types.js'

export const getAuth = (state: AppState): AuthState => state.auth
