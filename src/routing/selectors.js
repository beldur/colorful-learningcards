// @flow

import type { AppState, Location } from '../types'

export const getLocation = (state: AppState): Location => state.router.location
