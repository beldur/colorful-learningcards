// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Card, CardText } from 'react-mdl'
import { firebaseAuthUI } from '../../../firebase.js'
import { loginSuccess } from '../../../modules/auth/reducer.js'
import './signin.css'
import 'firebaseui/dist/firebaseui.css'

class SignIn extends PureComponent {
  firebaseUiElement: HTMLElement

  componentDidMount() {
    const { loginSuccess } = this.props

    firebaseAuthUI(this.firebaseUiElement, user => loginSuccess(user))
  }

  render () {
    return (
      <div>
        <h4>Select Sign In method</h4>
        <Card shadow={2} className="signin-card">
          <CardText>
            <div ref={c => this.firebaseUiElement = c}></div>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(state => ({ }), {
  loginSuccess,
})(SignIn)
