// @flow

import type { Card, CardKey } from 'types'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card as MdlCard, Icon } from 'react-mdl'
import * as selectors from 'modules/cards/selectors'
import * as actions from 'modules/cards/reducer'
import { COLORS, TEXT_COLOR } from 'modules/cards/constants'

import './card.css'

type CardState = {
  isFlipped: boolean,
}

type CardProps = {
  card: Card,
  id: CardKey,
  isSelected: boolean,
  hasSelectedCards: boolean,
  deleteCards: (key: Array<CardKey>) => void,
  updateSelected: (key: CardKey, selected: boolean) => void,
}

class CardComponent extends Component {
  state: CardState
  props: CardProps

  constructor(props) {
    super(props)

    this.state = {
      isFlipped: false,
    }
  }

  toggleFlip = () => {
    this.setState({ isFlipped: !this.state.isFlipped })
  }

  handleCardClick = (e) => {
    const { id, updateSelected, isSelected, hasSelectedCards } = this.props

    if (hasSelectedCards) {
      updateSelected(id, !isSelected)
    } else {
      this.toggleFlip()
    }
  }

  handleCardContextMenu = (e) => {
    const { id, updateSelected, isSelected } = this.props

    e.preventDefault();
    updateSelected(id, !isSelected)
  }

  render() {
    const { card, isSelected } = this.props
    const { isFlipped } = this.state

    return (
      <div className={`card ${isFlipped ? 'flipped' : ''} ${isSelected ? 'selected': ''}`}>
        <MdlCard
          className={`mdl-color--${COLORS[card.color]} mdl-color-text--${TEXT_COLOR[card.color]}`}
          shadow={2}
          onClick={this.handleCardClick}
          onContextMenuCapture={this.handleCardContextMenu}
        >
            <div className="front">
              <p>{card.front}</p>
            </div>
            <div className="back">
              <p>{card.back}</p>
            </div>
        </MdlCard>
        <Icon
          name="check"
          className="selected-icon mdl-color-text--white mdl-color--blue"
        />
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  card: selectors.getCardByKey(state, ownProps.id),
  isSelected: selectors.isSelected(state, ownProps.id),
  hasSelectedCards: selectors.hasSelectedCards(state),
}), {
  updateSelected: actions.updateSelected,
})(CardComponent)
