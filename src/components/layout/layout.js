// @flow

import type { AuthState, Location } from '../../types'

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Layout as MdlLayout, Content, Grid, Cell, Footer,
  FooterSection, FooterLinkList, Spinner } from 'react-mdl'

import { getAuth, isAuthenticated, isInitialized } from '../../modules/auth/selectors'
import { getLocation } from '../../routing/selectors'
import { logout } from '../../modules/auth/reducer'
import Header from './header'

import './layout.css'

type LayoutProps = {
  auth: AuthState,
  isAuthenticated: boolean,
  isAuthInitialized: boolean,
  children: any,
  logout: () => void,
  location: Location,
}

class Layout extends PureComponent {
  props: LayoutProps

  render () {
    const { children, isAuthenticated, isAuthInitialized, logout, location, auth } = this.props

    return (
      <MdlLayout fixedHeader fixedTabs>
        <Header
          isAuthenticated={isAuthenticated}
          isAuthInitialized={isAuthInitialized}
          location={location}
          logout={logout}
          auth={auth}
        />
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
