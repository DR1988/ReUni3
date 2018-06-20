// @flow
import React, { Component } from 'react'

import s from './ValveTimeComponent.scss'

type Props = {
  changeId: number,
  duration: number,
  width: number,
  lineID: number,
  showModal: () => void,
  setChosenValveTime: (lineID: number, changeId: number) => void,
}

class ValveTimeComponent extends Component<Props> {
  constructor(props: Props) { // eslint-disable-line
    super(props)
  }
  toggleValveTime = (e: Event) => {
    e.stopPropagation()
    const { changeId, showModal, setChosenValveTime, lineID } = this.props
    showModal()
    setChosenValveTime(lineID, changeId)
  }

  render() {
    const { duration, width } = this.props
    return (
      <div
        className={s.timeFormer}
        onClick={this.toggleValveTime}
        style={{
          width: `${width}%`,
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
