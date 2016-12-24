// @flow

import React, { PureComponent } from 'react'
import { Header as MdlHeader,  Navigation, HeaderRow, Tab } from 'react-mdl'
import { Link } from 'react-router'

import RoutedHeaderTabs from './routed-header-tabs'
import { getUserPhoto } from '../../modules/auth/selectors'

class Header extends PureComponent {
  render() {
    const { isAuthenticated, isAuthInitialized, auth, logout, location } = this.props

    const titleLink = <Link to="/" className="home-link">Colorful Learningcards</Link>

    return (
      <MdlHeader className={`${isAuthenticated ? 'authenticated' : ''}`}>
        <HeaderRow title={titleLink}>
          {isAuthInitialized ? (
            <Navigation>
              {!isAuthenticated ? (<Link to="/signin">SIGN IN</Link>) : null}
            </Navigation>
          ) : null}
          {isAuthenticated ? (
            <img
              src={getUserPhoto(auth.user)}
              role="presentation"
              className="user-image"
              onClick={logout}
            />
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
