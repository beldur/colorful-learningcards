// @flow

import type { AppState, AuthState, User } from '../../types'

export const getAuth = (state: AppState): AuthState => state.auth

export const isAuthenticated = (state: AppState): boolean => {
  const auth = getAuth(state)

  return auth.authenticated && auth.user !== null
}

export const getUserPhoto = (user: ?User) => user ? user.photoURL : undefined
