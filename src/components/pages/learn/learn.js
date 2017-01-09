// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Swipeable from 'react-swipeable'
import * as selectors from 'modules/learn/selectors'
import Card from '../cards/card'

class Learn extends PureComponent {
  render () {
    const { nextCardKey } = this.props

    return (
      <div>
        {nextCardKey ? (
          <Swipeable
            onSwipedLeft={(e) => console.log(e)}
          >
            <Card id={nextCardKey} />
          </Swipeable>
        ) : null}
      </div>
    )
  }
}

export default connect(state => ({
  nextCardKey: selectors.getNextCardToLearn(state),
}))(Learn)
