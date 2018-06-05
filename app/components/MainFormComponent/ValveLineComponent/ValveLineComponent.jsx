import React, { Component } from 'react'
import PropTypes from 'prop-types'

import s from './ValveLineComponent.scss'
import getUniqTimeLines from '../../../helpers/getUniqTimeLines'
import templates from '../../../helpers/templates/Templates'

const { LineTemplate } = templates
class ValveLineComponent extends Component {
  constructor(props) {
    super(props)
    this.linesTemplate = []
    this.resultLines = {}
  }
  elems = []
  componentWillMount() {
    console.log(2222)
    const { elem, showModal } = this.props
    const { changes } = elem
    let width = 0
    let workTime = 0
    let gapTime = 0
    for (let i = 0; i < changes.length; i++) {
      if (i <= changes.length - 2) {
        workTime = 100 * (changes[i].endTime - changes[i].startTime) / this.props.allTime
        gapTime = 100 * (changes[i + 1].startTime - changes[i].endTime) / this.props.allTime
        width = workTime + gapTime
      } else {
        gapTime = 0
        workTime = 100 * (changes[i].endTime - changes[i].startTime) / this.props.allTime
        width = workTime + gapTime
      }
      this.elems.push(
        <div
          key={changes[i].id}
          className={s['time-box']}
          onClick={() => console.log(222)}
          style={{
            width: `${width}%`,
          }}
        >
          <div
            className={s.timeFormer}
            onClick={(e) => { e.stopPropagation(); console.log(1123) }}
            style={{
              width: `${100 / width * workTime}%`
            }}
          >
            <span className={s.timeFormer_sign}>
              {workTime * this.props.allTime / 100}
            </span>
          </div>
          {i <= changes.length - 2 ? <div
            style={{ width: `${100 / width * gapTime}%` }}
            className={s.gap}
          /> : null}
        </div>,
      )
    }
    // const { elem } = this.props
    // this.resultLines = getUniqTimeLines(elem)
    // this.linesTemplate = LineTemplate(this.resultLines, this.props.allTime)
  }

  componentWillReceiveProps(nextProps) {
    // console.log(111);
    // this.resultLines = getUniqTimeLines(nextProps.elem.changes)
    // this.resultLines = getUniqTimeLines(nextProps.elem)
    // this.linesTemplate = LineTemplate(this.resultLines, nextProps.allTime)
  }

  render() {
    // console.log(this.props.elem.changes)
    return (
      <div className={s['time-box_keeper']}>
        {this.elems}
        {/* {this.props.elem.changes.map((el, idx) => {
          this.prev = el.endTime
          return (
            <div key={el.id}>
              <div
                className={s.timeFormer}
                style={{ width: el.endTime - el.startTime }}
              />
              {idx > 1 ? <div
                style={{ width: el.startTime - this.prev }}
                className={s.gap}
              /> : null}
            </div>
          )
        },
        )} */}
    
      </div>
    )
  }
}

ValveLineComponent.propTypes = {

}

export default ValveLineComponent
