// @flow

import React from 'react'
import { Tooltip, FABButton, Icon } from 'react-mdl'

const CreateCardButton = ({ onClick }: { onClick: () => void}) => (
  <div className="page-action-button delete-card">
    <Tooltip label="Delete Card">
      <FABButton colored ripple onClick={onClick}>
        <Icon name="delete" />
      </FABButton>
    </Tooltip>
  </div>
)

export default CreateCardButton
