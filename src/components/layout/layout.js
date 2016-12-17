// @flow

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {
    Layout as MdlLayout, Header, Content, Navigation,
    Icon, Grid, Cell
} from 'react-mdl'

class Layout extends PureComponent {
  render () {
    const { children } = this.props;

    return (
      <MdlLayout fixedHeader>
        <Header
          title={<Link to="/" className="home-link">Colorful Learningcards</Link>}
        >
          <Navigation>
            <Link to="/login">Components</Link>
          </Navigation>
        </Header>
      </MdlLayout>
    )
    // return (
    //   <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    //     <main className="mdl-layout__content">
    //       <div className="page-content mdl-grid">
    //         <div className="mdl-cell mdl-cell--middle mdl-cell--12-col">
    //           {children}
    //         </div>
    //       </div>
    //     </main>
    //     <footer className="mdl-mini-footer">
    //       <div className="mdl-mini-footer__left-section">
    //         <div className="mdl-logo">Colorful Learningcards</div>
    //         <ul className="mdl-mini-footer__link-list">
    //           <li><Link to="/">Home</Link></li>
    //           <li><Link to="/about">About</Link></li>
    //         </ul>
    //       </div>
    //     </footer>
    //   </div>
    // )
  }
}

export default connect()(Layout)
