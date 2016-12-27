// @flow

import type { Color, Card } from 'types'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FABButton, Card as MdlCard, CardText, CardActions, Icon, Spinner,
  Textfield, Button, CardTitle } from 'react-mdl'
import { COLORS } from 'modules/cards/constants'
import { isBusy } from 'modules/cards/selectors'

type CreateCardProps = {
  onCancel: () => void,
  onSave: (card: Card) => void,
  initialColor: Color,
  isBusy: boolean,
}

type CreateCardState = {
  color: Color,
  front: string,
  back: string,
}

class CreateCard extends Component {
  props: CreateCardProps
  state: CreateCardState

  static defaultProps = {
    initialColor: 'blue',
  }

  constructor(props: CreateCardProps) {
    super(props)

    this.state = {
      color: props.initialColor,
      front: '',
      back: '',
    }
  }

  handleColorClick(color: Color) {
    this.setState({ color })
  }

  handleFrontChange(event: SyntheticInputEvent) {
    this.setState({ front: event.target.value })
  }

  handleBackChange(event: SyntheticInputEvent) {
    this.setState({ back: event.target.value })
  }

  handleSaveClick() {
    const { onSave } = this.props
    const { color, front, back } = this.state

    onSave({ color, front, back })
  }

  render() {
    const { onCancel, isBusy } = this.props
    const { color, front, back } = this.state

    return (
      <div className="create-card">
        <MdlCard shadow={2}>
          <CardTitle>
            {COLORS.map(c =>
              <FABButton
                className={`mdl-color--${c} mdl-color-text--white`}
                onClick={() => this.handleColorClick(c)}
                key={c}
                ripple
                mini
              >
                {color === c ? <Icon name="check" /> : null}
              </FABButton>
            )}
          </CardTitle>
          <CardText>
            <div className="create-card--input">
              <Textfield
                onChange={e => this.handleFrontChange(e)}
                label="Front Text"
                floatingLabel
                value={front}
                required
              />
              <Textfield
                label="Back Text"
                floatingLabel
                value={back}
                onChange={e => this.handleBackChange(e)}
                required
              />
            </div>
          </CardText>
          <CardActions border>
            <Button raised ripple onClick={onCancel}>Cancel</Button>
            <Button raised ripple primary onClick={() => this.handleSaveClick()}>Save</Button>
          </CardActions>
          {isBusy ? <div className="busy"><Spinner /></div> : null}
        </MdlCard>
      </div>
    )
  }
}

export default connect(state => ({
  isBusy: isBusy(state),
}))(CreateCard)
