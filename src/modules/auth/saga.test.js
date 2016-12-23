import { firebaseAuth } from '../../firebase.js'
import { take, put, apply } from 'redux-saga/effects'
import { navigate } from '../../routing/reducer.js'
import { authFlow } from './saga.js'
import * as actions from './reducer.js'

describe('auth/saga', () => {
  const untilLogoutRequest = (flow) => {
    expect(flow.next().value).toEqual(
      put(actions.loginSuccess())
    )

    expect(flow.next().value).toEqual(
      put(navigate('/learn'))
    )

    expect(flow.next().value).toEqual(
      take(actions.LOGOUT_REQUESTED)
    )
  }

  it('should handle a logged in state change', () => {
    const flow = authFlow(actions.stateChanged({ }))

    untilLogoutRequest(flow)

    expect(flow.next().value).toEqual(
      apply(firebaseAuth, firebaseAuth.signOut),
    )

    expect(flow.next().value).toEqual(
      put(actions.logoutSuccess())
    )

    expect(flow.next().value).toEqual(
      put(navigate('/')),
    )
  })

  it('should handle logout failure', () => {
    const flow = authFlow(actions.stateChanged({ }))
    const error = 'error';

    untilLogoutRequest(flow)

    expect(flow.next().value).toEqual(
      apply(firebaseAuth, firebaseAuth.signOut),
    )

    // Throw exception
    expect(flow.throw(error).value).toEqual(
      put(actions.logoutFailed(error))
    )
  })
})
