// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Match, Miss, Redirect } from 'react-router'

import { Home, About, Layout, SignIn, Cards, Learn } from '../components/index'
import { isAuthenticated } from '../modules/auth/selectors'

type RoutesProps = {
  isAuthenticated: boolean,
}

const MatchWhenAuthorized = ({ isAuthenticated, component: Component, ...rest }) =>
  <Match {...rest} render={props => (
    (isAuthenticated) ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />

class Routes extends PureComponent {
  props: RoutesProps

  render() {
    const { isAuthenticated } = this.props

    return (
      <Layout>
        <Match pattern='/' component={Home} exactly />
        <Match pattern='/about' component={About} exactly />
        <Match pattern='/signin' component={SignIn} exactly />
        <MatchWhenAuthorized pattern='/cards' component={Cards} exactly isAuthenticated={isAuthenticated} />
        <MatchWhenAuthorized pattern='/learn' component={Learn} exactly isAuthenticated={isAuthenticated} />
        <Miss component={() => <Redirect to='/' />} />
      </Layout>
    )
  }
}

export default connect(state => ({
  isAuthenticated: isAuthenticated(state),
}))(Routes)
