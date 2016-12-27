// @flow

import type { AuthState, Location } from 'types'

import React, { PureComponent } from 'react'
import { Header as MdlHeader, Navigation, HeaderRow, Tab, Tooltip } from 'react-mdl'
import { Link } from 'react-router'

import RoutedHeaderTabs from './routed-header-tabs'
import { getUserPhoto } from 'modules/auth/selectors'

type HeaderProps = {
  isAuthenticated: boolean,
  isAuthInitialized: boolean,
  auth: AuthState,
  logout: () => void,
  location: Location,
  scroll: number
}

class Header extends PureComponent {
  props: HeaderProps

  render() {
    const { isAuthenticated, isAuthInitialized, auth, logout, location, scroll } = this.props
    const titleLink = <Link to="/" className="home-link">Colorful Learningcards</Link>
    const marginTop = (scroll > 56 && isAuthenticated) ? -56 : 0

    return (
      <MdlHeader className={`${isAuthenticated ? 'authenticated' : ''}`}>
        <HeaderRow title={titleLink} style={{ marginTop }}>
          {isAuthInitialized ? (
            <Navigation>
              {!isAuthenticated ? (<Link to="/signin">SIGN IN</Link>) : null}
            </Navigation>
          ) : null}
          {isAuthenticated ? (
            <Tooltip label="Sign out">
              <img
                src={getUserPhoto(auth.user)}
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
