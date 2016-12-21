// @flow

import type { Location } from '../types.js'

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import BrowserRouter from 'react-router-addons-controlled/ControlledBrowserRouter'
import { NAVIGATE } from './reducer'
import { getLocation } from './selectors.js'

type RouterProps = {
  location: Location,
  action: string,
  children: any,
  dispatch: () => void,
}

const history = createBrowserHistory()

class Router extends PureComponent {
  props: RouterProps

  constructor(props) {
    super(props)

    this.handleRouterChange = this.handleRouterChange.bind(this)
  }

  handleRouterChange(location, action) {
    if (action === 'SYNC') {
      action = this.props.action
    }

    this.props.dispatch({
      type: NAVIGATE,
      payload: { location, action }
    })
  }

  render() {
    const { children, location, action } = this.props

    return (
      <BrowserRouter
        history={history}
        action={action}
        location={location}
        onChange={this.handleRouterChange}
      >
        {children}
      </BrowserRouter>
    )
  }
}

export default connect(state => ({
  location: getLocation(state),
  action: state.router.action,
}))(Router)
