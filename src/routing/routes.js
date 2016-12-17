// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Match } from 'react-router'
import { Home, About, Layout } from '../components/index.js'

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
      </Layout>
    )
  }
}

export default connect()(Routes)
