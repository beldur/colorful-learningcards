// @flow

import type { AuthState } from '../../types.js'

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Layout as MdlLayout, Header, Content, Navigation,
  Grid, Cell, Footer, FooterSection, FooterLinkList } from 'react-mdl'
import { getAuth } from '../../modules/auth/selectors.js'
import { logout } from '../../modules/auth/reducer.js'
import './layout.css'

type LayoutProps = {
  auth: AuthState,
  children: any,
  logout: () => void,
}

class Layout extends PureComponent {
  props: LayoutProps

  render () {
    const { children, auth, logout } = this.props
    const titleLink = <Link to="/" className="home-link">Colorful Learningcards</Link>

    return (
      <MdlLayout fixedHeader>
        <Header title={titleLink}>
          <Navigation>
            {!auth.authenticated ? (<Link to="/login">SIGN IN</Link>) : null}
          </Navigation>
          {auth.authenticated && auth.user != null ? (
            <img
              src={auth.user.photoURL}
              role="presentation"
              className="user-image"
              onClick={logout}
            />
          ) : null}
        </Header>
        <Content>
          <Grid className="page-content" noSpacing>
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
}), {
  logout,
})(Layout)
