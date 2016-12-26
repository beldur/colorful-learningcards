import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { snackbarFlow } from './saga'
import * as actions from './reducer'

describe('snackbar/saga', () => {
  it('should handle snackbar flow', () => {
    const flow = snackbarFlow()

    expect(flow.next().value).toEqual(
      call(delay, 4000)
    )

    expect(flow.next().value).toEqual(
      put(actions.hide())
    )
  })
})
