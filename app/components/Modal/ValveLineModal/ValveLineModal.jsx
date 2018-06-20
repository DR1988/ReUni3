// @flow
import React, { Component } from 'react'

import s from './ValveLineModal.scss'
import type { ChosenElement } from '../../../containers/MainForm/MainFormTypes'

type Props = {
  closeModal: () => void,
  removeValveTime: (chosenElement: ChosenElement) => void,
  chosenElement: ChosenElement,
};

type ButtonProps = {
  removeValveTime: (chosenElement: ChosenElement) => void,
  chosenElement: ChosenElement,
  closeModal: () => void,
}

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) { // eslint-disable-line
    super(props)
  }
  _removeValveTime: () => void

  _removeValveTime = () => {
    const { removeValveTime, chosenElement } = this.props
    removeValveTime(chosenElement)
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

const ValveLineModal = ({
  closeModal,
  chosenElement,
  removeValveTime,
  changeEndTime,
  changeStartTime,
  resetToPreviousChanges,
}: Props) => {
  const { chosenLine, changeId, newElement } = chosenElement
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
                changeValue={changeStartTime}
                value={!newElement ? chosenLine.changes[changeId].startTime : 0}
                // defaultValue={!newElement ? chosenLine.changes[changeId].startTime : 0}
              />
            </div>
            <div>
              <label htmlFor="duration">Duration</label>
              <br />
              <CustomInput
                id="duration"
                changeValue={changeEndTime}
                value={!newElement ? chosenLine.changes[changeId].duration : 0}
                // defaultValue={!newElement ? chosenLine.changes[changeId].endTime : 0}
              />
            </div>
          </div>
          <button onClick={closeModal} >Ok</button>
          {!newElement ?
            <Button
              removeValveTime={removeValveTime}
              chosenElement={chosenElement}
              closeModal={closeModal}
            /> : null}
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

export default ValveLineModal
