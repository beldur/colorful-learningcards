// @flow

import type { AuthState, Location } from 'types'

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Layout as MdlLayout, Content, Grid, Cell, Footer, Snackbar,
  FooterSection, FooterLinkList, Spinner } from 'react-mdl'

import { getAuth, isAuthenticated, isInitialized } from 'modules/auth/selectors'
import { isSnackbarVisible, getSnackbarText } from 'modules/snackbar/selectors'
import { getLocation } from 'routing/selectors'
import { logout } from 'modules/auth/reducer'
import Header from './header'

import './layout.css'

type LayoutProps = {
  auth: AuthState,
  isAuthenticated: boolean,
  isAuthInitialized: boolean,
  children: any,
  logout: () => void,
  location: Location,
  snackbarText: string,
  isSnackbarVisible: boolean,
}

class Layout extends PureComponent {
  props: LayoutProps

  render () {
    const { children, isAuthenticated, isAuthInitialized, logout,
      location, auth, isSnackbarVisible, snackbarText } = this.props

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
        <Snackbar active={isSnackbarVisible} timeout={5000} onTimeout={() => { }}>
          {snackbarText}
        </Snackbar>
      </MdlLayout>
    )
  }
}

export default connect(state => ({
  auth: getAuth(state),
  isAuthenticated: isAuthenticated(state),
  isAuthInitialized: isInitialized(state),
  location: getLocation(state),
  isSnackbarVisible: isSnackbarVisible(state),
  snackbarText: getSnackbarText(state),
}), {
  logout,
})(Layout)
