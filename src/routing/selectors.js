// @flow

import type { AppState, Location } from '../types.js'

export const getLocation = (state: AppState): Location => state.router.location
