// @flow

import type { } from 'types'

export function* learnCardsFlow(): Generator<*, *, *> {

}

export default function* saga(): Generator<*, *, *> {
  yield [
    learnCardsFlow(),
  ]
}
