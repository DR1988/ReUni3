import React from 'react'
import PropTypes from 'prop-types'

import RPMSetter from '../RMPSetterComponent'
import TempSetter from '../TempSetterComponent'
import ValveLine from '../ValveLineComponent'
import './LineFormerComponent.scss'

const LineFormer = (props) => {
  const template = []
  const elem = props.elem
  // if (elem.name === 'ValveLine') {
    template.push(
      <ValveLine
        key={elem.id}
        elem={elem}
        allTime={props.allTime}
      />)
  // }
  // if (elem.name === 'RPMSetter') {
  //   template.push(
  //     <RPMSetter
  //       key={elem.id}
  //       elem={elem}
  //       allTime={props.allTime}
  //     />)
  // }
  // if (elem.name === 'TempSetter') {
  //   template.push(
  //     <TempSetter
  //       key={elem.id}
  //       elem={elem}
  //       allTime={props.allTime}
  //     />)
  // }
  return (
    // <div data-elemId={elem.id} onClick={() => props.handle(props.elem)}>
      // { template }
      <ValveLine
        key={elem.id}
        elem={elem}
        allTime={props.allTime}
    />
    // </div>
  )
}
LineFormer.propTypes = {
  elem: PropTypes.object,
  handle: PropTypes.func,
  allTime: PropTypes.number,
}

export default LineFormer
