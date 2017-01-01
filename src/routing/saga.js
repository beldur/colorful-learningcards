
import { LOCATION_CHANGE } from 'connected-react-router'
import { takeLatest, call } from 'redux-saga/effects'
import ReactGA from 'react-ga'

export function* trackPageview(): Generator<*, *, *> {
  yield call(ReactGA.set, { page: window.location.pathname })
  yield call(ReactGA.pageview, window.location.pathname)
}

// trackLocationChangeFlow tracks initial pageview and subsequent location changes
export function* trackLocationChangeFlow(): Generator<*, *, *> {
  yield trackPageview()
  yield takeLatest(LOCATION_CHANGE, trackPageview)
}

export default function* saga(): Generator<*, *, *> {
  yield [
    trackLocationChangeFlow(),
  ]
}
