// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { firebaseAuthUI } from '../../firebase.js'
import { loginSuccess } from '../../modules/auth/reducer.js'

class Login extends PureComponent {
  firebaseUiElement: HTMLElement;

  componentDidMount() {
    const { loginSuccess } = this.props

    firebaseAuthUI(this.firebaseUiElement, (user) => {
      loginSuccess(user)
    })
  }

  render () {
    return (
      <div>
        <h2>Login</h2>
        <div ref={c => this.firebaseUiElement = c}></div>
      </div>
    )
  }
}

export default connect(state => ({ }), {
  loginSuccess,
})(Login)
