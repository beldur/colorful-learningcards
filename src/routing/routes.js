// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Match, Miss, Redirect } from 'react-router'
import { Home, About, Layout, SignIn, Cards, Learn } from '../components/index.js'

class Routes extends PureComponent {
  render() {
    return (
      <Layout>
        <Match pattern='/' component={Home} exactly />
        <Match pattern='/about' component={About} />
        <Match pattern='/signin' component={SignIn} />
        <Match pattern='/cards' component={Cards} />
        <Match pattern='/learn' component={Learn} />
        <Miss component={() => <Redirect to='/' />} />
      </Layout>
    )
  }
}

export default connect()(Routes)
