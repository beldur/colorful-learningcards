// @flow

import React from 'react'
import { connect } from 'react-redux'
import { HeaderTabs } from 'react-mdl'
import { navigate } from '../../routing/reducer.js'

const RoutedHeaderTabs = ({ children, location, dispatch, navigate, ...props }) => {
  let activeTab = -1;

  children.forEach((child, index) => {
    if (child.props.to === location.pathname) {
      activeTab = index
    }
  })

  return (
    <HeaderTabs
      activeTab={activeTab}
      onChange={(id) => navigate(children[id].props.to)}
      ripple
      {...props}
    >
      {children}
    </HeaderTabs>
  )
}

export default connect(undefined, {
  navigate
})(RoutedHeaderTabs)
