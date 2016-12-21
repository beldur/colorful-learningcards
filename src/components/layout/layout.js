// @flow

import type { AuthState, Location } from '../../types.js'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Layout as MdlLayout, Header, Content, Navigation, HeaderRow, Tab,
  Grid, Cell, Footer, FooterSection, FooterLinkList } from 'react-mdl'
import { getAuth } from '../../modules/auth/selectors.js'
import { getLocation } from '../../routing/selectors.js'
import { logout } from '../../modules/auth/reducer.js'
import RoutedHeaderTabs from './routed-header-tabs.js'
import './layout.css'

type LayoutProps = {
  auth: AuthState,
  children: any,
  logout: () => void,
  location: Location,
}

class Layout extends Component {
  props: LayoutProps

  render () {
    const { children, auth, logout, location } = this.props
    const titleLink = <Link to="/" className="home-link">Colorful Learningcards</Link>

    return (
      <MdlLayout fixedHeader fixedTabs className={`${auth.authenticated ? 'authenticated' : ''}`}>
        <Header>
          <HeaderRow title={titleLink}>
            <Navigation>
              {!auth.authenticated ? (<Link to="/signin">SIGN IN</Link>) : null}
            </Navigation>
            {auth.authenticated && auth.user != null ? (
              <img
                src={auth.user.photoURL}
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
              {children}
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
  location: getLocation(state),
}), {
  logout,
})(Layout)
