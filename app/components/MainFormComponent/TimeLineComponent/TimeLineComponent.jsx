import React from 'react'
import PropTypes from 'prop-types'

import s from './TimeLineComponent.scss'

const TimeLineComponent = (props) => {
  const dividersTemplate = []
  if (props.allTime > 0) {
    const maxI = props.allTime / 50
    for (let i = 0; i <= maxI; i++) {
      dividersTemplate.push(
        <div key={i} className={s['time-former']}>
          <div className={s.divider} />
          <div className={s['time-count']}>{Math.floor((props.allTime * i) / maxI)}</div>
        </div>,
      )
    }
  }

  let formWidth = 0
  let scale = 1
  const ttllefRightPadding = 40
  if (typeof window !== 'undefined' && document.getElementById('form-Manupalation')) {
    formWidth = document.getElementById('form-Manupalation').offsetWidth
    if ((formWidth - ttllefRightPadding) / props.allTime > 1 && props.allTime > 0) {
      scale = (formWidth - ttllefRightPadding) / props.allTime
    }
  }
  // console.log(scale)
  // console.log('distance', props.distance, 'time', props.time)
  return (<div className={s['time-line_wraper']}>
    <div className={s['time-line']} style={{ width: props.width }} >
      <div className={s['time-show']}>
        {dividersTemplate}
      </div>
    </div>
    <div
      className={s['time-presenter']}
      style={{ left: `${(props.distance )}%`, transition: `left ${props.time}s linear` }}
      // style={{ left: props.distance * scale - 13, transition: `left ${props.time}s linear` }}
    >
      <div className={s.line} />
      <div className={s['arrow-up']} />
    </div>
  </div>
  )
}

TimeLineComponent.propTypes = {

}

TimeLineComponent.propTypes = {
  id: PropTypes.number,
  handle: PropTypes.func,
}

TimeLineComponent.defaultProps = {
  width: '100%',
  distance: 0,
  currentTime: 10,
}

TimeLineComponent.propTypes = {
  width: PropTypes.string,
}
export default TimeLineComponent
