// @flow
import React, { Component } from 'react'

import s from './ValveTimeComponent.scss'

type Props = {
  changeId: number | string,
  value: number,
  startTime: number,
  width: number,
  lineID: number,
  crossingValueStart: number,
  crossingValueEnd: number,
  showModal: (e: SyntheticEvent<HTMLDivElement>) => void,
  setChosenValveTime: (lineID: number, changeId: number) => void,
}

type State = {
  window: {
    body: {
      x: number,
      y: number,
      side: 'left' | 'right',
      position: 'top' | 'bottom',
    },
    arrow: {
      x: number,
      y: number,
    }
  }
}
class ValveTimeComponent extends Component<Props, State> {
  constructor(props: Props) { // eslint-disable-line
    super(props)
    this.state = {
      window: {
        body: {
          x: 0,
          y: 0,
          side: 'left',
          position: 'top',
        },
        arrow: {
          x: 0,
          y: 0,
        },
      },
    }
  }
  toggleValveTime = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const { changeId, showModal, setChosenValveTime, lineID } = this.props
    // showModal(e)
    let formLeft
    let formRight
    let formTop
    let formBottom
    let position = this.state.window.body.position
    let side = this.state.window.body.side
    const mainForm = document.getElementById('mainFormContainer')
    console.log(mainForm)
    if (mainForm) {
      ({ left: formLeft, right: formRight, top: formTop, bottom: formBottom } = mainForm.getBoundingClientRect())
    }
    // console.log(formLeft, formRight, formTop, formBottom)
    const { left, right, top, bottom } = e.currentTarget.getBoundingClientRect()
    // console.log(left, right, top, bottom)
    const valveWidth = right - left
    const valveHeight = bottom - top
    if (formRight - right + valveWidth < 400) { // window doesn't fit to form
      side = 'right'
    }
    console.log(formBottom - bottom - 20)
    console.log(formBottom - bottom - 20 < 250)
    if (formBottom - bottom - 20 < 250) {
      position = 'bottom'
    }
    this.setState({
      ...this.state,
      window: {
        ...this.state.window,
        body: {
          ...this.state.window.body,
          side,
          position,
        },
        arrow: {
          ...this.state.window.arrow,
          x: valveWidth / 2,
        },
      },
    })
    setChosenValveTime(lineID, changeId)
  }

  getCrossingSpace = (
    { crossingValueStart, crossingValueEnd }: { crossingValueStart: number, crossingValueEnd: number },
  ): string => {
    if (crossingValueStart > 0 && crossingValueEnd < 0) {
      return `linear-gradient(90deg, rgba(0, 0, 0, 0) ${100 * crossingValueStart}%, rgba(171, 193, 197, 1) 0%, rgba(171, 193, 197, 1) ${100 + 100 * crossingValueEnd}%, rgba(0, 0, 0, 0) 0),
      rgba(171, 193, 197, 0.5) repeating-linear-gradient(-45deg, transparent, transparent 7.5px,
      rgba(226, 5, 5, 0.5) 7.5px, rgba(226, 5, 5, 0.5) 15px)`
    } else if (crossingValueStart > 0) {
      return `linear-gradient(90deg, rgba(171, 193, 197, 0.3) ${100 * crossingValueStart}%, rgba(171, 193, 197, 1) 0%),
      rgba(171, 193, 197, 0.5) repeating-linear-gradient(-45deg, transparent, transparent 7.5px,
      rgba(226, 5, 5, 0.5) 7.5px, rgba(226, 5, 5, 0.5) 15px)`
    } else if (crossingValueEnd < 0) {
      return `linear-gradient(90deg, rgba(171, 193, 197, 1) ${100 + 100 * crossingValueEnd}%, rgba(0, 0, 0, 0) 0),
      rgba(171, 193, 197, 0.5) repeating-linear-gradient(-45deg, transparent, transparent 7.5px,
      rgba(226, 5, 5, 0.5) 7.5px, rgba(226, 5, 5, 0.5) 15px)`
    } else if (crossingValueStart === 0) {
      return 'linear-gradient(90deg, red 3px, rgba(171, 193, 197, 1) 0%)'
    } else if (crossingValueEnd === 0) {
      return `linear-gradient(90deg, rgba(171, 193, 197, 1) calc(${100}% - 3px), red 3px)`
    }

    return 'rgba(171, 193, 197, 1)'
  }

  render() {
    const {
      value,
      width,
      startTime,
      crossingValueStart,
      crossingValueEnd,
      chosenElement,
      lineID,
      changeId,
    } = this.props
    // console.log('this.props.changeId ', this.props.changeId)
    // console.log('chosenElement', chosenElement)
    const { side, position } = this.state.window.body
    const { x } = this.state.window.arrow
    return (
      <div
        className={s.timeFormer}
        onClick={this.toggleValveTime}
        style={{
          left: `${100 * startTime}%`,
          background: this.getCrossingSpace({ crossingValueStart, crossingValueEnd }),
          zIndex: crossingValueStart || crossingValueEnd ? 2 : 'auto',
            // crossingValue >= 0 ?
            // // `linear-gradient(90deg, rgba(71, 193, 197, 0.3) ${100 * crossingValue}%, rgba(171, 193, 197, 1) 0%)`
            // `linear-gradient(90deg, rgba(0, 0, 0, 0) ${100 * crossingValue}%, rgba(171, 193, 197, 1) 0%),
            // rgba(171, 193, 197, 0.5) repeating-linear-gradient(-45deg, transparent, transparent 7.5px,
            // rgba(226, 5, 5, 0.5) 7.5px, rgba(226, 5, 5, 0.5) 15px)`
            // : 'rgba(171, 193, 197, 1)',
          width: `${100 * width}%`,
        }}
      >
        {changeId === chosenElement.changeId && lineID === chosenElement.chosenLine.id ?
          <div className={s.modal} style={{ [side]: 0, [position]: 'calc(100% + 20px)' }}>
            <div></div>
            <div style={{ [side]: `${x}px` }} className={s[`arrow_${position}`]}></div>
          </div> : null }
        <div className={s.timeFormer_content}>
          <span className={s.timeFormer_sign}>
            {value}
          </span>
        </div>
      </div>
    )
  }
}

export default ValveTimeComponent
