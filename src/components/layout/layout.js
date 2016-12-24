// @flow

import type { AuthState, Location } from '../../types'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Layout as MdlLayout, Header, Content, Navigation, HeaderRow, Tab,
  Grid, Cell, Footer, FooterSection, FooterLinkList, Spinner } from 'react-mdl'

import { getAuth, getUserPhoto, isAuthenticated, isInitialized } from '../../modules/auth/selectors'
import { getLocation } from '../../routing/selectors'
import { logout } from '../../modules/auth/reducer'
import RoutedHeaderTabs from './routed-header-tabs'

import './layout.css'

type LayoutProps = {
  auth: AuthState,
  isAuthenticated: boolean,
  isAuthInitialized: boolean,
  children: any,
  logout: () => void,
  location: Location,
}

class Layout extends Component {
  props: LayoutProps

  render () {
    const { children, isAuthenticated, isAuthInitialized, logout, location, auth } = this.props
    const titleLink = <Link to="/" className="home-link">Colorful Learningcards</Link>

    return (
      <MdlLayout fixedHeader fixedTabs>
        <Header className={`${isAuthenticated ? 'authenticated' : ''}`}>
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
        </Header>
        <Content className="mdl-color--grey-100 mdl-color-text--grey-700">
          <Grid className="page-content">
            <Cell col={12}>
              {!isAuthInitialized ? (
                <div className="loading"><Spinner /></div>
              ) : children}
            </Cell>
          </Grid>
        </Content>
        <Footer size="mini">
          <FooterSection logo="Colorful Learningcards">
            <FooterLinkList>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
            </FooterLinkList>
          </FooterSection>
        </Footer>
      </MdlLayout>
    )
  }
}

export default connect(state => ({
  auth: getAuth(state),
  isAuthenticated: isAuthenticated(state),
  isAuthInitialized: isInitialized(state),
  location: getLocation(state),
}), {
  logout,
})(Layout)
