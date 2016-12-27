// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { FABButton, Icon, Tooltip  } from 'react-mdl'
import * as actions from 'modules/cards/reducer'
import { isCreateOpen } from 'modules/cards/selectors'
import CreateCard from './create-card'

import './cards.css'

type CardsProps = {
  createOpen: () => void,
  createClose: () => void,
  createRequested: () => void,
  isCreateOpen: boolean,
}

class Cards extends PureComponent {
  props: CardsProps

  render () {
    const { createOpen, createClose, isCreateOpen, createRequested } = this.props

    return (
      <div>
        { isCreateOpen ? (
          <div>
            <h4>New Card</h4>
            <CreateCard
              onCancel={createClose}
              onSave={createRequested}
            />
          </div>
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
