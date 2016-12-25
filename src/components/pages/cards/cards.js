// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FABButton, Icon, Tooltip, Card, CardText, CardActions,
  Textfield, Button, CardMenu, CardTitle } from 'react-mdl'
import * as actions from '../../../modules/cards/reducer'
import { isCreateOpen } from '../../../modules/cards/selectors'

type CardsProps = {
  createOpen: () => void,
  createClose: () => void,
  createRequested: () => void,
  isCreateOpen: boolean,
}

class Cards extends Component {
  props: CardsProps

  render () {
    const { createOpen, createClose, isCreateOpen, createRequested } = this.props

    return (
      <div>
        <h4>Cards</h4>

        { isCreateOpen ? (
          <Card shadow={2}>
            <CardTitle></CardTitle>
            <CardText>
              <Textfield label="Front" floatingLabel />
              <Textfield label="Back" floatingLabel />
            </CardText>
            <CardActions border>
              <Button raised ripple onClick={createClose}>Cancel</Button>
              <Button raised ripple primary onClick={createRequested}>Save</Button>
            </CardActions>
            <CardMenu>
              <FABButton ripple mini className="mdl-color--blue" />
              <FABButton ripple mini className="mdl-color--orange" />
              <FABButton ripple mini className="mdl-color--red" />
              <FABButton ripple mini className="mdl-color--green" />
            </CardMenu>
          </Card>
        ) : (
          <div style={{ position: 'absolute', bottom: 30, right: 30 }}>
            <Tooltip label="Add Card">
              <FABButton colored ripple onClick={createOpen}>
                <Icon name="add" />
              </FABButton>
            </Tooltip>
          </div>
        )}
      </div>
    )
  }
}

export default connect(state => ({
  isCreateOpen: isCreateOpen(state),
}), {
  createOpen: actions.createOpen,
  createClose: actions.createClose,
  createRequested: actions.createRequested,
})(Cards)
