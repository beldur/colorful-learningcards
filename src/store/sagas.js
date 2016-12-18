import authSaga from '../modules/auth/saga.js'

export default function *rootSaga () {
  yield [
    authSaga(),
  ]
}
