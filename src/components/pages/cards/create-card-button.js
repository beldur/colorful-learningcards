// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Tooltip, FABButton, Icon } from 'react-mdl'

import { createOpen } from 'modules/cards/reducer'
import { isCreateOpen } from 'modules/cards/selectors'

const CreateCardButton = ({ createOpen, isCreateOpen }) => (
  !isCreateOpen ? (
    <div className="page-action-button">
      <Tooltip label="Add Card">
        <FABButton colored ripple onClick={createOpen}>
          <Icon name="add" />
        </FABButton>
      </Tooltip>
    </div>
  ) : null
)

export default connect(state => ({
  isCreateOpen: isCreateOpen(state),
}), {
  createOpen,
})(CreateCardButton)
