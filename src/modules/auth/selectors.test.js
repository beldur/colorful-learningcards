import reducer, * as actions from './reducer'
import * as selectors from './selectors'

describe('auth/selectors', () => {
  const initialState = {
    auth: reducer()
  }

  it('should return correct `isAuthenticated`', () => {
    // Initial state should not be authenticated
    expect(selectors.isAuthenticated(initialState)).toBe(false)

    // Login
    const user = { name: 'Tester' }
    const loggedInState = {
      auth: reducer(initialState.auth, actions.stateChanged(user))
    }

    expect(selectors.isAuthenticated(loggedInState)).toBe(true)
  })
})
