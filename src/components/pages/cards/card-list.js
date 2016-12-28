// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { } from 'react-mdl'
import * as selectors from 'modules/cards/selectors'

const Card = connect((state, ownProps) => ({
  card: selectors.getCardByKey(state, ownProps.id)
}))(({ card }) => {
  return (
    <div>
      Color: {card.color}<br/>
      Front: {card.front}<br/>
      Back: {card.back}
      <hr/>
    </div>
  )
})

type CardListProps = {
  cardList: Array<string>
}

class CardList extends PureComponent {
  props: CardListProps

  render() {
    const { cardList } = this.props

    return (
      <div className="card-list">
        {cardList.map(key => <Card key={key} id={key} />)}
      </div>
    )
  }
}

export default connect(state => ({
  cardList: selectors.getSortedCardList(state)
}))(CardList)
