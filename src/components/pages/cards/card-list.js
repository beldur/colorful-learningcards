// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-mdl'
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
  cardList: Array<string>,
  isBusy: boolean,
}

class CardList extends PureComponent {
  props: CardListProps

  render() {
    const { cardList, isBusy } = this.props

    return (
      <div className="card-list">
        {isBusy ? (
          <div className="loading"><Spinner /></div>
        ) : (
          cardList.map(key => <Card key={key} id={key} />)
        )}
      </div>
    )
  }
}

export default connect(state => ({
  cardList: selectors.getSortedCardList(state),
  isBusy: selectors.isBusy(state),
}))(CardList)
