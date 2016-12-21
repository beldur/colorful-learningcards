import { take, put, race } from 'redux-saga/effects'
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
  it('should navigate to /cards after successful login', () => {
    const flow = startAuth()

    expect(flow.next({ loginSuccess: true }).value).toEqual(
      put(navigate('/cards')),
    )
  })

  it('should navigate to / after successful logout', () => {
    const flow = startAuth()

    flow.next({ logoutRequested: true }) // Logout request
    flow.next() // Logout success

    expect(flow.next().value).toEqual(
      put(navigate('/')),
    )
  })
})
