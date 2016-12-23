import { firebaseAuth } from '../../firebase.js'
import { take, put, race, apply } from 'redux-saga/effects'
import { navigate } from '../../routing/reducer.js'
import { authFlow } from './saga.js'
import * as actions from './reducer.js'

const startAuth = () => {
  const flow = authFlow()

  expect(flow.next().value).toEqual(
    race({
      loginSuccess: take(actions.LOGIN_SUCCESS),
      logoutRequested: take(actions.LOGOUT_REQUESTED),
    }),
  )

  return flow
}

describe('auth/saga', () => {
  it('should handle successful login flow', () => {
    const flow = startAuth()

    expect(flow.next({ loginSuccess: true }).value).toEqual(
      put(navigate('/learn')),
    )
  })

  it('should handle logout requested flow', () => {
    const flow = startAuth()

    expect(flow.next({ logoutRequested: true }).value).toEqual(
      apply(firebaseAuth, firebaseAuth.signOut)
    )

    expect(flow.next().value).toEqual(
      put(actions.logoutSuccess())
    )

    expect(flow.next().value).toEqual(
      put(navigate('/')),
    )
  })

  it('should handle logout requested flow with exception', () => {
    const flow = startAuth()
    const error = 'Failure'

    expect(flow.next({ logoutRequested: true }).value).toEqual(
      apply(firebaseAuth, firebaseAuth.signOut)
    )

    expect(flow.throw(error).value).toEqual(
      put(actions.logoutFailed(error))
    )
  })
})
