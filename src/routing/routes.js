// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Match } from 'react-router'
import { Home, About, Layout, Login } from '../components/index.js'

class Routes extends PureComponent {
  render() {
    return (
      <Layout>
        <Match
          pattern='/'
          component={Home}
          exactly
        />
        <Match
          pattern='/about'
          component={About}
        />
        <Match
          pattern='/login'
          component={Login}
        />
      </Layout>
    )
  }
}

export default connect()(Routes)
