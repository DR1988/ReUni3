import React from 'react'
import './LineTemplate.scss'
/* eslint-disable */
import PropTypes from 'prop-types'
import s from './LineTemplate.scss'

const ActiveTime = (props) =>{
  if (!props.changes.duration) {
    return null
  }
  return (
  <div
    className={s.time}
    style={{
      width: props.changes.duration * props.scale,
    }}
  >
    <div className={s['time-container']}>
      {props.changes.value ?
        <span>{props.changes.value}</span>
        : <span>{props.changes.duration}</span>}
    </div>
  </div>
  )
}

ActiveTime.propTypes = {
  changes: PropTypes.object,
  id: PropTypes.number,
}

const GapTime = (props) => {
  return (<div
  className={s.gap}
  style={{
    width: props.width * props.scale,
  }}
/>)
}

GapTime.propTypes = {
  width: PropTypes.number,
}

const WaitShow = props => <div
  className = {s.waitShow}
  style = {{
    display: props.display
  }}>
</div>

const LineFormer = props => <div className={s['time-former']}>{props.children} </div>

LineFormer.propTypes = {
  children: PropTypes.node,
}

const setLineTemplate = (resultValves, allTime) => {
    // console.log('resultValves.resultchanges', resultValves)
  // console.log(resultValves.name)
  let formWidth = 0
  let scale = 1
  const ttllefRightPadding = 40
  if (allTime > 0) {
    if (typeof window !== 'undefined' && document.getElementById('form-Manupalation')) {
      formWidth = document.getElementById('form-Manupalation').offsetWidth
      if ((formWidth - ttllefRightPadding) / allTime > 1) {
        scale = (formWidth - ttllefRightPadding) / allTime
      }
    }
  }
  // console.log('formWidth', formWidth)
  // console.log(scale)
  const lineTemplate = []
  for (let i = 0; i < resultValves.resultchanges.length; i++) {
    // console.log(resultValves.resultchanges[i])
    // if(resultValves.elementId === 8) {
    //   console.log(resultValves)
    // }
    lineTemplate.push(
      <LineFormer key={i}>
        <ActiveTime changes={resultValves.resultchanges[i]} scale={scale} id={i} />
        <WaitShow
          display = {resultValves.resultchanges[i].waitForValue ? 'block' : 'none'}
          id={i}
        />
        <GapTime
          width={resultValves.resultchanges[i + 1] ?
                 (resultValves.resultchanges[i + 1].startTime -
                 resultValves.resultchanges[i].endTime) : null}
          scale={scale}
          id={i}
        />
      </LineFormer>
    )
  }
  return lineTemplate
}

export default setLineTemplate
