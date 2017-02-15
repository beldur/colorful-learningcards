// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

import { Home, About, Layout, SignIn, Cards, Learn } from 'components/index'
import { isAuthenticated } from 'modules/auth/selectors'

type RoutesProps = {
  isAuthenticated: boolean,
}

export const RouteWhenAuthorized = ({ isAuthenticated, component: Component, redirect, ...rest }: Object) =>
  <Route {...rest} render={props => (
    (isAuthenticated) ? (
      <Component {...props} />
    ) : (
      redirect ? <Redirect to="/" /> : <div></div>
    )
  )} />

class Routes extends PureComponent {
  props: RoutesProps

  render() {
    const { isAuthenticated } = this.props

    return (
      <Layout>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/about' component={About} exact />
          <Route path='/signin' component={SignIn} exact />
          <RouteWhenAuthorized
            path='/cards'
            component={Cards}
            exact
            isAuthenticated={isAuthenticated}
            redirect
          />
          <RouteWhenAuthorized
            path='/learn'
            component={Learn}
            exact
            isAuthenticated={isAuthenticated}
            redirect
          />
          <Route path='*' component={() => <Redirect to='/' />} />
        </Switch>
      </Layout>
    )
  }
}

export default connect(state => ({
  isAuthenticated: isAuthenticated(state),
}))(Routes)
