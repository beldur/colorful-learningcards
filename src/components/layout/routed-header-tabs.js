// @flow

import React from 'react'
import { connect } from 'react-redux'
import { HeaderTabs } from 'react-mdl'
import { push } from 'connected-react-router'

const RoutedHeaderTabs = ({ children, location, dispatch, push, ...props }) => {
  const activeTab = children.reduce((result, child, index) => {
    if (child.props.to === location.pathname) {
      return index
    }
    return result
  }, -1)

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

export default connect(undefined, {
  push,
})(RoutedHeaderTabs)
