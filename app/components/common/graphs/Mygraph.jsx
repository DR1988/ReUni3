// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ScaleRect from './helpers'

type Props = {
  width: number,
  height: number,
}

type State = {
  isScaling: boolean,
  tranformM: string,
  scale: number,
  coords: {
    scaleX: number,
    scaleY: number,
    width: number,
    height: number,
    initialX: number,
    initialY: number,
  },
}
class Graph extends Component<Props, State> {
  static defaultProps = {
    width: 800,
    height: 300,
  }

  cursorpt: {
    x: number,
    y: number,
  }

  constructor(props) {
    super(props)
    this.svgRef = React.createRef()
    this.state = {
      isScaling: false,
      tranformM: 'translate(0 0) scale(1)',
      scale: 1,
      coords: {
        scaleX: 1,
        scaleY: 1,
        width: 1,
        height: 1,
        initialX: 0,
        initialY: 0,
      },
    }

    this.cursorpt = {
      x: 0,
      y: 0,
    }
  }

  componentDidMount() {
    this.svgpt = this.svgRef.current.createSVGPoint()
    // this.svgDimensions = {
    //   height: this.svgRef.current.getBoundingClientRect().height,
    //   width: this.svgRef.current.getBoundingClientRect().width,
    // }
  }

  _getCoordinates = (evn) => {
    const { clientX, clientY } = evn
    this.svgpt.x = clientX
    this.svgpt.y = clientY
    const cursorpt = this.svgpt.matrixTransform(evn.target.getScreenCTM().inverse())
    return cursorpt
  }

  _mouseDown = (evn) => {
    const cursorpt = this._getCoordinates(evn)
    this.setState({
      isScaling: true,
      coords: {
        ...this.state.coords,
        initialX: cursorpt.x,
        initialY: cursorpt.y,
      },
    })
  }

  _drawRect = (evn) => {
    const cursorpt = this._getCoordinates(evn)
    const { initialX, initialY } = this.state.coords
    const width = (cursorpt.x - initialX)
    const height = (cursorpt.y - initialY)
    this.setState({
      coords: {
        ...this.state.coords,
        width: width > 0 ? width : 1,
        height: height > 0 ? height : 1,
      },
    })
  }

  _mouseUp = () => {
    const { width, height, initialX, initialY } = this.state.coords
    if (width <= 1 || height <= 1) {
      this.setState({
        isScaling: false,
        coords: {
          ...this.state.coords,
          width: 1,
          height: 1,
          initialX: 0,
          initialY: 0,
        },
      })
    } else {
      const scaleX = 800 / width
      const scaleY = 300 / height
      const tranformM =
        `translate(${-scaleX * initialX} ${-scaleY * initialY}) scale(${scaleX} ${scaleY})`
      this.setState({
        tranformM,
        isScaling: false,
        coords: {
          ...this.state.coords,
          scaleX,
          scaleY,
          width: 1,
          height: 1,
        },
      })
    }
  }

  render() {
    const { isScaling, coords, tranformM } = this.state
    const step = 5
    return (
      <div style={{ border: '1px solid red', width: 800 }}>
        <svg
          style={{ display: 'block' }}
          width="100%" height="300" ref={this.svgRef}
          viewBox="0 0 800 300"
          onMouseDown={this._mouseDown}
          onMouseUp={isScaling ? this._mouseUp : f => f}
          onMouseMove={isScaling ? this._drawRect : f => f}
          onMouseLeave={isScaling ? this._mouseUp : f => f}
        >
          <g
            transform={tranformM}
          >
            <rect width="100%" height="100%" fill="transparent" />
            {isScaling ?
              <ScaleRect
                coords={coords}
                style={{
                  stroke: 'green',
                  strokeWidth: 2,
                }}
              />
            : null}
            <path id="lineAB"
              d={`M 10 280
              l ${step} -22 l ${step} 12 l ${step} -18 l ${step} 15
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 22
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 22
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -220 l ${step} 210 l ${step} -10 l ${step} 15
              l ${step} -12 l ${step} 8 l ${step} -14 l ${step} 18
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              `}
              stroke="red"
              strokeWidth="2" fill="none" />
          </g>
        </svg>
      </div>
    )
  }
}

export default Graph
