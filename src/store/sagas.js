// @flow

import authSaga from '../modules/auth/saga'
import cardsSaga from '../modules/cards/saga'

export default function *rootSaga(): Generator<*,*,*> {
  yield [
    authSaga(),
    cardsSaga(),
  ]
}
