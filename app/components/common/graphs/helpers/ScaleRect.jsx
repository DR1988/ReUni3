// @flow
/*
  eslint-disable react/prop-types
*/
import React from 'react'

type Props = {
  coords: {
    initialX: number,
    initialY: number,
    width: number,
    height: number,
    scaleX: number,
  },
  style: {
    stroke: string,
    strokeWidth: number
  }
}


const ScaleRect = (props: Props) => {
  const { coords, style } = props
  return (
    <rect
      x={coords.initialX}
      y={coords.initialY}
      width={coords.width}
      height={coords.height}
      style={{ stroke: style.stroke, fill: 'none', strokeWidth: `${style.strokeWidth / coords.scaleX}` }}
    />
  )
}

ScaleRect.defaultProps = {
  style: {
    strokeWidth: 1,
    stroke: 'blue',
  },
}
export default ScaleRect
