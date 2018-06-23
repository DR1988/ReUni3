// @flow
import React, { Component } from 'react'

import s from './ValveTimeComponent.scss'

type Props = {
  changeId: number,
  duration: number,
  startTime: number,
  width: number,
  lineID: number,
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

  render() {
    const { duration, width, startTime } = this.props
    return (
      <div
        className={s.timeFormer}
        onClick={this.toggleValveTime}
        style={{
          left: `${100 * startTime}%`,
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
