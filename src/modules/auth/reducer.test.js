import reducer, { stateChanged, logoutSuccess,
  STATE_CHANGED, LOGOUT_SUCCESS } from './reducer'

describe('auth/reducer', () => {
  it(`should handle ${STATE_CHANGED}`, () => {
    const user = { name: 'Tester' }

    expect(reducer({}, stateChanged(user))).toEqual({
      authenticated: true,
      user,
    })

    expect(reducer({}, stateChanged(null))).toEqual({
      authenticated: false,
      user: null,
    })
  })

  it(`should handle ${LOGOUT_SUCCESS}`, () => {
    expect(reducer({}, logoutSuccess())).toEqual({
      authenticated: false,
      user: null
    })
  })
})
