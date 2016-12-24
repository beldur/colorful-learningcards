// @flow

import React from 'react'
import { connect } from 'react-redux'
import { HeaderTabs } from 'react-mdl'
import { push } from 'connected-react-router'

const RoutedHeaderTabs = ({ children, location, dispatch, push, ...props }) => {
  let activeTab = -1

  children.forEach((child, index) => {
    if (child.props.to === location.pathname) {
      activeTab = index
    }
  })

  return (
    <HeaderTabs
      activeTab={activeTab}
      onChange={(id) => push(children[id].props.to)}
      ripple
      {...props}
    >
      {children}
    </HeaderTabs>
  )
}

export default connect(undefined, { push })(RoutedHeaderTabs)
