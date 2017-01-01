// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { deleteCards, createOpen } from 'modules/cards/reducer'
import { getSelectedCards, isCreateOpen } from 'modules/cards/selectors'

import CreateCardButton from './create-card-button'
import DeleteCardButton from './delete-card-button'

class CardActionButton extends PureComponent {
  render() {
    const { selectedCards, deleteCards, isCreateOpen, createOpen } = this.props
    let className = ''

    if (!isCreateOpen) {
      if (selectedCards.length > 0) {
        className = 'show-delete-card'
      } else {
        className = 'show-create-card'
      }
    }

    return (
      <div className={`${className}`}>
          <DeleteCardButton onClick={() => deleteCards(selectedCards)} />
          <CreateCardButton onClick={createOpen} />
      </div>
    )
  }
}

export default connect(state => ({
  selectedCards: getSelectedCards(state),
  isCreateOpen: isCreateOpen(state),
}), {
  deleteCards,
  createOpen,
})(CardActionButton)
