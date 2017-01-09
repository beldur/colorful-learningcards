// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { isAuthenticated } from 'modules/auth/selectors'
import AuthenticatedHome from './authenticated-home.js'

type HomeProps = {
  isAuthenticated: boolean,
}

class Home extends PureComponent {
  props: HomeProps

  render () {
    const { isAuthenticated } = this.props;

    return (
      <div>
        {isAuthenticated ? <AuthenticatedHome /> : (
          <div>
            <h3 className="headline">Welcome to Colorful Learningcards</h3>
            <blockquote>A place to learn vocabulary with colorful learningcards</blockquote>
          </div>
        )}
      </div>
    )
  }
}

export default connect(state => ({
  isAuthenticated: isAuthenticated(state),
}))(Home)
