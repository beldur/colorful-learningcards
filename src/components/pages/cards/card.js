// @flow

import type { Card, CardKey } from 'types'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card as MdlCard, Icon } from 'react-mdl'
import * as selectors from 'modules/cards/selectors'
import { COLORS, TEXT_COLOR } from 'modules/cards/constants'

import './card.css'

type CardState = {
  isFlipped: boolean,
}

type CardProps = {
  card: Card,
  id: CardKey,
  hasSelectedCards: boolean,
  deleteCards: (key: Array<CardKey>) => void,
  onCardClick: () => void,
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
    const { onCardClick, hasSelectedCards } = this.props

    if (!hasSelectedCards) {
      this.toggleFlip()
    }

    onCardClick()
  }

  render() {
    const { card, className } = this.props
    const { isFlipped } = this.state

    return (
      <div
        className={`card-wrapper ${className ? className : ''}`}
        onClick={this.handleCardClick}
      >
        <div className={`card ${isFlipped ? 'flipped' : ''}`}>
          <MdlCard
            className={`mdl-color--${COLORS[card.color]} mdl-color-text--${TEXT_COLOR[card.color]}`}
            shadow={2}
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
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  card: selectors.getCardByKey(state, ownProps.id),
  hasSelectedCards: selectors.hasSelectedCards(state),
}))(CardComponent)
