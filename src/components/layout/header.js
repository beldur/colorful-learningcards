// @flow

import type { User, Location } from 'types'

import React, { PureComponent } from 'react'
import { Header as MdlHeader, Navigation, HeaderRow, Tab, Tooltip } from 'react-mdl'
import { Link } from 'react-router'

import RoutedHeaderTabs from './routed-header-tabs'

type HeaderProps = {
  isAuthenticated: boolean,
  isAuthInitialized: boolean,
  user: User,
  logout: () => void,
  location: Location,
  scroll: number
}

class Header extends PureComponent {
  props: HeaderProps

  render() {
    const { isAuthenticated, isAuthInitialized, user, logout, location, scroll } = this.props
    const titleLink = <Link to="/" className="home-link">Colorful Learningcards</Link>
    const marginTop = 0 //(scroll > 112 && isAuthenticated) ? -56 : 0

    return (
      <MdlHeader className={`${scroll > 56 ? 'fixed' : ''} ${isAuthenticated ? 'authenticated' : ''}`}>
        <HeaderRow title={titleLink} style={{ marginTop }}>
          {isAuthInitialized ? (
            <Navigation>
              {!isAuthenticated ? (<Link to="/signin">SIGN IN</Link>) : null}
            </Navigation>
          ) : null}
          {isAuthenticated ? (
            <Tooltip label="Sign out">
              <img
                src={user.uid}
                role="presentation"
                className="user-image"
                onClick={logout}
              />
            </Tooltip>
          ) : null}
        </HeaderRow>
        <RoutedHeaderTabs location={location}>
          <Tab component={Link} to="/cards">My Cards</Tab>
          <Tab component={Link} to="/learn">Learn</Tab>
        </RoutedHeaderTabs>
      </MdlHeader>
    )
  }
}

export default Header
