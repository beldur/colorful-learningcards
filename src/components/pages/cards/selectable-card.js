// @flow

import type { CardKey } from 'types'

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as selectors from 'modules/cards/selectors'
import * as actions from 'modules/cards/reducer'
import CardComponent from './card'

type SelectableCardProps = {
  isSelected: boolean,
  hasSelectedCards: boolean,
  updateSelected: (key: CardKey, selected: boolean) => void,
  id: CardKey,
}

class SelectableCard extends PureComponent {
  props: SelectableCardProps

  handleCardContextMenu = (e) => {
    const { id, updateSelected, isSelected } = this.props

    e.preventDefault();
    updateSelected(id, !isSelected)
  }

  handleCardClick = (e) => {
    const { id, updateSelected, isSelected, hasSelectedCards } = this.props

    if (hasSelectedCards) {
      updateSelected(id, !isSelected)
    }
  }

  render() {
    const { isSelected, id } = this.props

    return (
      <div
          onContextMenuCapture={this.handleCardContextMenu}
      >
        <CardComponent
          id={id}
          onCardClick={this.handleCardClick}
          className={`${isSelected ? 'selected': ''}`}
        />
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  isSelected: selectors.isSelected(state, ownProps.id),
  hasSelectedCards: selectors.hasSelectedCards(state),
}), {
  updateSelected: actions.updateSelected,
})(SelectableCard)

