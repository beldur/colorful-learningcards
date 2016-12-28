import { take, put, race, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import { getUser } from 'modules/auth/selectors'
import { createCardFlow } from './saga'
import * as actions from './reducer'

describe('cards/saga/createCardFlow', () => {
  describe('create Card flow', () => {
    let flow

    beforeEach(() => {
      flow = createCardFlow()

      expect(flow.next().value).toEqual(
        race({
          createRequested: take(actions.CREATE_REQUESTED),
          locationChange: take(LOCATION_CHANGE),
        }),
      )
    })

    it('should handle location change', () => {
      expect(flow.next({ locationChange: true }).value).toEqual(
        put(actions.createClose())
      )
    })

    it('should handle create requests', () => {
      const card = {
        color: 1,
        front: 'front',
        back: 'back'
      }

      expect(flow.next({ createRequested: { payload: { card }}}).value).toEqual(
        select(getUser)
      )

      // @todo complete tests, but make firebase testable first
    })
  })
})
