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
    currentScaleX: number,
    mirrorX: -1 | 1,
    mirrorY: -1 | 1,
  },
  strokeWidth: number,
  stroke: string,
  fill: string,
}


const ScaleRect = (props: Props) => {
  const { coords, strokeWidth, stroke, fill } = props
  return (
    <rect
      x={coords.initialX}
      y={coords.initialY}
      width={Math.abs(coords.width)}
      height={coords.height}
      style={{
        pointerEvents: 'none',
        stroke,
        fill,
        strokeWidth: `${strokeWidth / coords.scaleX}`,
        // transform: `scale(-1, 2)`,
        transformOrigin: `${coords.initialX}px ${coords.initialY}px`,
        // transform: 'rotate(32deg)',
        transform: `scale(${coords.mirrorX}, ${coords.mirrorY})`,
      }}
    />
  )
}

ScaleRect.defaultProps = {
  stroke: 'blue',
  fill: 'none',
}
export default ScaleRect
