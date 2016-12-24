// @flow

import authSaga from '../modules/auth/saga'

export default function *rootSaga(): Generator {
  yield [
    authSaga(),
  ]
}
