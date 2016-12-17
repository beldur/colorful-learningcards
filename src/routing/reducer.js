// @flow

import createBrowserHistory from 'history/createBrowserHistory'

const NAME = 'router'
const NAVIGATE = `${NAME}/NAVIGATE`
const history = createBrowserHistory()

const initialState = {
  location: history.location,
  action: history.action,
}

export default function reducer(state: Object = initialState, action: Object) {
  switch (action.type) {
    case NAVIGATE:
      return {
        location: action.payload.location,
        action: action.payload.action,
      }
    default:
      return state
  }
}

export const navigate = (location: Object, action: string) => ({
  type: NAVIGATE,
  payload: { location, action }
})
