// @flow

import type { Card, CardKey } from 'types'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card as MdlCard, IconButton } from 'react-mdl'
import * as selectors from 'modules/cards/selectors'
import * as actions from 'modules/cards/reducer'
import { COLORS, TEXT_COLOR } from 'modules/cards/constants'

type CardState = {
  isFlipped: boolean,
}

type CardProps = {
  card: Card,
  id: CardKey,
  deleteCard: (key: CardKey) => void,
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

  render() {
    const { card, deleteCard, id } = this.props
    const { isFlipped } = this.state

    return (
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <MdlCard
          className={`mdl-color--${COLORS[card.color]} mdl-color-text--${TEXT_COLOR[card.color]}`}
          shadow={2}
          onClick={this.toggleFlip}
        >
            <div className="front">
              <p>{card.front}</p>
            </div>
            <div className="back">
              <p>{card.back}</p>
            </div>
        </MdlCard>
        <IconButton name="delete" onClick={() => deleteCard(id)} className="delete"></IconButton>
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  card: selectors.getCardByKey(state, ownProps.id),
}), {
  deleteCard: actions.deleteCard,
})(CardComponent)
