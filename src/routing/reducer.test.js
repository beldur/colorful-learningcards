import reducer, { navigate, NAVIGATE } from './reducer.js'

describe('routing/reducer', () => {
  it(`should handle ${NAVIGATE}`, () => {

    expect(reducer({}, navigate('/test'))).toEqual({
      location: {
        pathname: '/test',
        search: '',
        hash: '',
        query: null,
      },
      action: 'PUSH'
    })
  })
})
