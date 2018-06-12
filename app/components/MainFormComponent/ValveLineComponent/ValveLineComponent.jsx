// @flow
import React from 'react'

import s from './ValveLineComponent.scss'
import type { ValveLineType } from '../../../containers/MainForm/MainFormTypes'

type Props = {
  line: ValveLineType,
  allTime: number,
}
const ValveLineComponent = (props: Props) => (
  <div
    className={s['time-box_keeper']}
    onClick={() => console.log(222)}
  >
    {props.line.changes.map((el) => {
      const { gapTime, duration } = el
      const width = 100 * ((duration + gapTime) / props.allTime)
      return (
        <div
          key={el.id}
          className={s['time-box']}
          style={{
            width: `${width}%`,
          }}
        >
          <div
            className={s.timeFormer}
            onClick={(e) => { e.stopPropagation(); console.log(1123) }}
            style={{
              width: `${100 * (duration / width)}%`,
            }}
          >
            <span className={s.timeFormer_sign}>
              {duration}
            </span>
          </div>
        </div>)
    })}
  </div >
)

export default ValveLineComponent
