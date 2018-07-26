// @flow
import React, { Component } from 'react'
import cn from 'classnames'

import s from './RMPModal.scss'
import type { ChosenElement } from '../../../containers/MainForm/MainFormTypes'

type Props = {
  closeModal: () => void,
  removeValveTime: () => void,
  chosenElement: ChosenElement,
  changeStartTime: (value: number) => void,
};

type ButtonProps = {
  removeValveTime: () => void,
  chosenElement: ChosenElement,
  closeModal: () => void,
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

const isSetValveTimeEnable = (startTime: number, endTime: number, RPMValue: ?number, wrongSign: string): string => {
  if (startTime >= endTime) return 'Start time should be less then End time'
  if (RPMValue < 100) return 'RPMValue should be greater 100'
  if (RPMValue > 3000) return 'RPMValue should be less 3000'
  if (wrongSign) return wrongSign
  // if (newStartTime <= newEndTime) return 'Start time should be less then End time'
  return ''
}

const RMPModal = ({
  chosenElement,
  closeModal,
  changeRPMValue,
  changeStartTime,
  changeEndTime,
  resetToPreviousChanges,
  removeValveTime,
}: Props) => {
  const { chosenLine, changeId, wrongSign } = chosenElement
  const filteredChange = chosenLine.changes.filter(change => change.changeId === changeId)[0]
  const { value, startTime, endTime } = filteredChange
  const wrongSignValue = isSetValveTimeEnable(startTime, endTime, value, wrongSign)

  return (
    <div className={s.root}>
      <div className={s.content}>
        <header>Change RPM Values</header>
        <main>
          <div className={s.inputs} >
            <div>
              <label htmlFor="start-time">Start time</label>
              <br />
              <CustomInput
                id="start-time"
                changeValue={changeStartTime}
                value={filteredChange.startTime}
              />
            </div>
            <div>
              <label htmlFor="end-time">End time</label>
              <br />
              <CustomInput
                id="end-time"
                changeValue={changeEndTime}
                value={filteredChange.endTime}
              />
            </div>
          </div>
          <div>
            <label htmlFor="RPM_value">RPM value</label>
            <br />
            <CustomInput
              id="RPM_value"
              changeValue={changeRPMValue}
              value={value || 0}
            />
          </div>
          <div>
            <label htmlFor="waitForValue">
              wait for value
              <input id="waitForValue" type="checkbox" />
            </label>
          </div>
          {wrongSignValue ?
            <div>
              <span>{wrongSignValue}</span>
            </div> : null}
          <button
            className={cn({ [s.button_disable]: wrongSignValue })}
            onClick={closeModal}
          >Ok</button>
          <Button
            removeValveTime={removeValveTime}
            chosenElement={chosenElement}
            closeModal={closeModal}
          />
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

RMPModal.propTypes = {

}

export default RMPModal
