// @flow

import React, { PureComponent } from 'react'
import { Card, CardText } from 'react-mdl'
import { firebaseAuthUI } from '../../../firebase.js'
import './signin.css'
import 'firebaseui/dist/firebaseui.css'

class SignIn extends PureComponent {
  firebaseUiElement: HTMLElement

  componentDidMount() {
    firebaseAuthUI(this.firebaseUiElement)
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

export default SignIn
