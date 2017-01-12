// @flow

import type { AppState, LearnState, CardKey } from 'types'


export const getLearn = (state: AppState): LearnState => state.learn

export const getNextCardToLearn = (state: AppState): ?CardKey =>
  getLearn(state).nextCardKey
