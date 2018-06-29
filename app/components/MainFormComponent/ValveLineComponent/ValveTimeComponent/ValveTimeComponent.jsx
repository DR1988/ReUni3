// @flow
import React, { Component } from 'react'

import s from './ValveTimeComponent.scss'

type Props = {
  changeId: number,
  duration: number,
  startTime: number,
  width: number,
  lineID: number,
  crossingValueStart: number,
  crossingValueEnd: number,
  showModal: () => void,
  onClick: (lineID: number, changeId: number) => void,
}

class ValveTimeComponent extends Component<Props> {
  constructor(props: Props) { // eslint-disable-line
    super(props)
  }
  toggleValveTime = (e: Event) => {
    e.stopPropagation()
    const { changeId, showModal, onClick, lineID } = this.props
    showModal()
    onClick(lineID, changeId)
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
    }

    return 'rgba(171, 193, 197, 1)'
  }

  render() {
    const { duration, width, startTime, crossingValueStart, crossingValueEnd } = this.props
    // console.log('crossingValue', crossingValue)
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
        <span className={s.timeFormer_sign}>
          {duration}
        </span>
      </div>
    )
  }
}

export default ValveTimeComponent
