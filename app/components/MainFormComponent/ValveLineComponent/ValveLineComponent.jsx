// @flow
import React, { Component } from 'react'

import s from './ValveLineComponent.scss'
import type { ValveLineType } from '../../../containers/MainForm/MainFormTypes'
import ValveTimeComponent from './ValveTimeComponent'

type Props = {
  line: ValveLineType,
  allTime: number,
  showModal: () => void,
  setChosenValveTime: () => void
}

class ValveLineComponent extends Component<Props> {
  constructor(props: Props) { // eslint-disable-line
    super(props)
  }

  setValue = (
    lineName: 'ValveLine' | 'RPMSetter' | 'TempSetter' | 'NewValveLine' | 'NewRPMSetter' | 'NewTempSetter',
    value: number, duration: number): number => {
    switch (lineName) {
      case 'RPMSetter':
      case 'TempSetter':
        return value
      default:
        return duration
    }
  }

  render() {
    const { showModal, setChosenValveTime, allTime, line } = this.props
    const lineName = line.name
    return (
      <div
        className={s['time-box_keeper']}
      >
        {line.changes.map((el) => {
          const { startTime, endTime, value, crossingValueEnd, crossingValueStart } = el
          const duration = endTime - startTime
          // console.log('value', value)
          // console.log('el', el)
          // const width = 100 * ((duration + gapTime) / allTime)
          return (
            // <div
            //   key={el.changeId}
            //   className={s['time-box']}
            //   style={{
            //     marginLeft: ind === 0 ? `${100 * startTime/allTime}%` : 0,
            //     width: `${width}%`,
            //   }}
            // >
              <ValveTimeComponent
                key={el.changeId}
                lineID={line.id}
                changeId={el.changeId}
                value={this.setValue(lineName, value || 0, duration)}
                startTime={startTime / allTime}
                width={duration / allTime}
                showModal={showModal}
                setChosenValveTime={setChosenValveTime}
                crossingValueEnd={crossingValueEnd / duration}
                crossingValueStart={crossingValueStart / duration}
              />
            // </div>
          )
        })}
      </div >
    )
  }
}

export default ValveLineComponent
