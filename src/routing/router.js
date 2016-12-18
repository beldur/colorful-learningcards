import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import BrowserRouter from 'react-router-addons-controlled/ControlledBrowserRouter'
import { NAVIGATE } from './reducer'

const history = createBrowserHistory()

class Router extends PureComponent {
  constructor(props) {
    super(props)

    this.handleRouterChange = this.handleRouterChange.bind(this)
  }

  static propTypes = {
    location: PropTypes.object,
    action: PropTypes.string,
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
  location: state.router.location,
  action: state.router.action,
}))(Router)
