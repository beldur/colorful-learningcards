// @flow

import type { AppState, SnackbarState } from 'types'

export const getSnackbar = (state: AppState): SnackbarState =>
  state.snackbar

export const isSnackbarVisible = (state: AppState): boolean =>
  getSnackbar(state).isVisible

export const getSnackbarText = (state: AppState): string =>
  getSnackbar(state).text
