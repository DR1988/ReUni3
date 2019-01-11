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

const CartesianGrids = (props: Props) => {
  const { coords, style } = props
  return (
    <g className="cartesian-grid" >
      <rect
        x={20}
        y={20}
        width={40}
        height={40}
        style={{ stroke: style.stroke, fill: 'none', strokeWidth: `${1}` }}
      />
    </g>
  )
}

CartesianGrids.defaultProps = {
  style: {
    strokeWidth: 1,
    stroke: 'blue',
  },
}
export default CartesianGrids
