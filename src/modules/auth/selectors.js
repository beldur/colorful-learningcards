// @flow

import type { AppState, AuthState, User } from 'types'

export const getAuth = (state: AppState): AuthState =>
  state.auth

export const isAuthenticated = (state: AppState): boolean => {
  const auth = getAuth(state)

  return auth.authenticated && auth.user !== null
}

export const getUserPhoto = (user: ?User) =>
  user ? user.photoURL : undefined

export const getUserId = (state: AppState): ?string => {
  const user = getAuth(state).user

  if (user) {
    return user.uid
  }
}

export const isInitialized = (state: AppState): boolean =>
  getAuth(state).initialized
