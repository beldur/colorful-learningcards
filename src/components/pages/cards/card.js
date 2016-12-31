// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card as MdlCard } from 'react-mdl'
import * as selectors from 'modules/cards/selectors'
import { COLORS, TEXT_COLOR } from 'modules/cards/constants'

type CardState = {
  isFlipped: boolean
}

class Card extends Component {
  state: CardState

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
    const { card } = this.props
    const { isFlipped } = this.state

    return (
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={this.toggleFlip}>
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
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  card: selectors.getCardByKey(state, ownProps.id)
}))(Card)
