// @flow

import authSaga from 'modules/auth/saga'
import cardsSaga from 'modules/cards/saga'
import snackbarSaga from 'modules/snackbar/saga'
import routingSaga from 'routing/saga'

export default function *rootSaga(): Generator<*,*,*> {
  yield [
    authSaga(),
    cardsSaga(),
    snackbarSaga(),
    routingSaga(),
  ]
}
