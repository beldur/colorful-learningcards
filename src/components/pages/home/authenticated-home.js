// @flow

import type { User, CardList } from 'types'

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Grid, Cell } from 'react-mdl'
import { getUser } from 'modules/auth/selectors'
import { getSortedCardList } from 'modules/cards/selectors'

import './home.css'

type AuthenticatedHomeProps = {
  user: User,
  cardList: CardList,
}

class AuthenticatedHome extends PureComponent {
  props: AuthenticatedHomeProps

  render() {
    const { user, cardList } = this.props;

    return (
      <div>
        <h3 className="headline">
          Welcome Back!
          <img
            alt={user.displayName}
            className="user-photo"
            src={`${user.photoURL}?sz=100`}
          />
          <em>{user.displayName}</em>
        </h3>

        <h4>Stats</h4>
        <Grid>
          <Cell>Number of Cards: <strong>{cardList.length}</strong></Cell>
        </Grid>
      </div>
    )
  }
}

export default connect(state => ({
  user: getUser(state),
  cardList: getSortedCardList(state),
}))(AuthenticatedHome)
