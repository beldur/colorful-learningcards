// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Spinner, Grid, Cell } from 'react-mdl'
import * as selectors from 'modules/cards/selectors'
import SelectableCard from './selectable-card'

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
        <Grid>
          {isBusy ? (
            <Cell col={12}><div className="loading"><Spinner /></div></Cell>
          ) : (
            cardList.map(key => (
              <Cell col={4} key={key}><SelectableCard id={key} /></Cell>
            ))
          )}
        </Grid>
      </div>
    )
  }
}

export default connect(state => ({
  cardList: selectors.getSortedCardList(state),
  isBusy: selectors.isBusy(state),
}))(CardList)
