// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import s from './NewValveLineModal.scss'
import type { ChosenElement } from '../../../containers/MainForm/MainFormTypes'

type Props = {
  closeModal: () => void,
  chosenElement: ChosenElement,
  changeNewStartTime: (value: number) => void,
  changeNewEndTime: (value: number) => void,
};

type ButtonProps = {
  removeValveTime: () => void,
  // chosenElement: ChosenElement,
  // closeModal: () => void,
}

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) { // eslint-disable-line
    super(props)
  }
  _removeValveTime: () => void

  _removeValveTime = () => {
    const { removeValveTime } = this.props
    removeValveTime()
  }
  render() {
    return <button onClick={this._removeValveTime}>Remove</button>
  }
}

type CustomInputProps = {
  // defaultValue: number,
  id: string | number,
  value: number,
  changeValue: (value: number) => void,
}

class CustomInput extends Component<CustomInputProps> { // eslint-disable-line
  constructor(props: CustomInputProps) { // eslint-disable-line
    super(props)
  }
  _changeValue = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { changeValue } = this.props
    if (Number.isInteger(+e.target.value.trim()) && +e.target.value.trim() >= 0) {
      changeValue(+e.target.value)
    }
  }
  render() {
    const { value, id } = this.props
    return (<input
      id={id}
      type="text"
      onChange={this._changeValue}
      value={value}
    />)
  }
}
const NewValveLineModal = ({
  closeModal,
  chosenElement,
  resetToPreviousChanges,
  changeNewStartTime,
  changeNewEndTime,
}: Props) => {

  const isSetValveTimeEnable = (newStartTime: number, newEndTime: number, wrongSign:string): string => {
    if (newStartTime >= newEndTime) return 'Start time should be less then End time'
    if (wrongSign) return wrongSign
    // if (newStartTime <= newEndTime) return 'Start time should be less then End time'
    return ''
  }
  const { chosenLine, wrongSign, newStartTime, newEndTime } = chosenElement
  // console.log('newStartTime', newStartTime, newEndTime)
  return (
    <div className={s.root}>
      <div className={s.content}>
        <header>Change Values</header>
        <main>
          <div className={s.inputs} >
            <div>
              <label htmlFor="start-time">Start time</label>
              <br />
              <CustomInput
                id="start-time"
                changeValue={changeNewStartTime}
                value={!isNaN(newStartTime) ? newStartTime : 0}
              // defaultValue={!newElement ? chosenLine.changes[changeId].startTime : 0}
              />
            </div>
            <div>
              <label htmlFor="end-time">End time</label>
              <br />
              <CustomInput
                id="end-time"
                changeValue={changeNewEndTime}
                value={!isNaN(newEndTime) ? newEndTime : 0}
              // defaultValue={!newElement ? chosenLine.changes[changeId].endTime : 0}
              />
            </div>
          </div>
          {isSetValveTimeEnable(newStartTime, newEndTime, wrongSign) ?
            <div>
              <span>{isSetValveTimeEnable(newStartTime, newEndTime, wrongSign)}</span>
            </div> : null}
          <button
            className={cn({ [s.button_disable]: isSetValveTimeEnable(newStartTime, newEndTime, wrongSign) })}
            onClick={closeModal}
          >Ok</button>
          <button
            onClick={() => {
              resetToPreviousChanges()
              closeModal()
            }}
          >Cancel</button>
        </main>
      </div>
    </div>
  )
}

export default NewValveLineModal
