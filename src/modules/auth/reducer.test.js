import reducer, { stateChanged, logoutSuccess,
  STATE_CHANGED, LOGOUT_SUCCESS } from './reducer'

describe('auth/reducer', () => {
  it(`should handle ${STATE_CHANGED}`, () => {
    const user = { name: 'Tester' }

    expect(reducer(undefined, stateChanged(user))).toEqual({
      authenticated: true,
      user,
      initialized: true,
    })

    expect(reducer(undefined, stateChanged(null))).toEqual({
      authenticated: false,
      user: null,
      initialized: true,
    })
  })

  it(`should handle ${LOGOUT_SUCCESS}`, () => {
    expect(reducer(undefined, logoutSuccess())).toEqual({
      authenticated: false,
      user: null,
      initialized: false,
    })
  })
})
