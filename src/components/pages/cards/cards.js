// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { FABButton, Icon, Tooltip  } from 'react-mdl'
import * as actions from 'modules/cards/reducer'
import { isCreateOpen } from 'modules/cards/selectors'
import CreateCard from './create-card'
import CardList from './card-list'

import './cards.css'

type CardsProps = {
  createClose: () => void,
  createRequested: () => void,
  isCreateOpen: boolean,
}

class Cards extends PureComponent {
  props: CardsProps

  render() {
    const { createClose, isCreateOpen, createRequested } = this.props

    return (
      <div>
        {isCreateOpen ? (
          <div>
            <h4>New Card</h4>
            <CreateCard
              onCancel={createClose}
              onSave={createRequested}
            />
          </div>
        ) : (
          <CardList />
        )}
      </div>
    )
  }
}

export default connect(state => ({
  isCreateOpen: isCreateOpen(state),
}), {
  createClose: actions.createClose,
  createRequested: actions.createRequested,
})(Cards)
