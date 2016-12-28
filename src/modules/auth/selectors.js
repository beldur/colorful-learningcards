// @flow

import type { AppState, AuthState, User } from 'types'

export const getAuth = (state: AppState): AuthState =>
  state.auth

export const isAuthenticated = (state: AppState): boolean => {
  const auth = getAuth(state)

  return auth.authenticated && auth.user !== null
}

export const getUser = (state: AppState): ?User => {
  const user = getAuth(state).user

  return user || undefined
}

export const isInitialized = (state: AppState): boolean =>
  getAuth(state).initialized
