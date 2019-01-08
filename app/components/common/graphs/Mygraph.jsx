// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Graph extends Component {
  static propTypes = {
    width: PropTypes.number,

  }
  constructor(props) {
    super(props)
    this.svgRef = React.createRef()
    this.state = {
      isScaling: false,
      tranformM: "translate(0 0) scale(1)",
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
    this.svgDimensions = {
      height: 0,
      width: 0,
    }
    this.cursorpt = {
      x: 0,
      y: 0,
    }
    this.lastCursorChangeScalePosition = null
  }

  componentDidMount() {
    this.svgpt = this.svgRef.current.createSVGPoint()
    this.svgDimensions = {
      height: this.svgRef.current.getBoundingClientRect().height,
      width: this.svgRef.current.getBoundingClientRect().width,
    }
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
    // console.log(cursorpt)
    const { scaleX, scaleY, initialX, initialY } = this.state.coords
    console.log('cursorpt.x', cursorpt.x)
    // console.log('initialX', initialX)
    // console.log(scaleX * initialX)
    // console.log(cursorpt.x + scaleX * initialX)
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
    const { scaleX, scaleY, initialX, initialY } = this.state.coords
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
        }
      })
    } else {
      const scaleX = 800 / width
      const scaleY = 300 / height
      const tranformM = `translate(${-scaleX * initialX} ${-scaleY * initialY}) scale(${scaleX} ${scaleY})`
      this.setState({
        tranformM,
        isScaling: false,
        coords: {
          ...this.state.coords,
          scaleX,
          scaleY,
          width: 1,
          height: 1,
          // initialX: 0,
          // initialY: 0,
        }
      })
    }
  }

  getPosition = (evn: MouseEvent) => {
    this.cursorpt = this._getCoordinates(evn)
    // console.log(this.cursorpt)
  }

  render() {
    const { vertical, horizontal, isScaling, coords, tranformM } = this.state
    // console.log(coords)
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
            onMouseDown={e => {
              console.log(e.currentTarget.getAttribute('transform'))
            }}
            transform={tranformM}
          >
            <rect width="100%" height="100%" fill="transparent" />
            {isScaling ? <rect
              x={coords.initialX}
              y={coords.initialY}
              width={coords.width}
              height={coords.height}
              style={{ stroke: 'blue', fill: 'none', strokeWidth: `${1}` }}
            /> : null}
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
            {/* <circle cx="550" cy="250" r="25" style={{ fill: 'purple' }} />
            <circle cx="450" cy="250" r="25" style={{ fill: 'red' }} />
            <circle cx="500" cy="50" r="25" style={{ fill: 'orange' }} />
            <circle cx="500" cy="50" r="2.5" style={{ fill: 'red' }} />
            <circle cx="350" cy="50" r="25" style={{ fill: 'green' }} />
            <circle cx="350" cy="50" r="2.5" style={{ fill: 'red' }} />
            <text style={{ userSelect: 'none' }} x="40" y="130">Abracadabra</text> */}
          </g>
        </svg>
      </div>
    )
  }
}

export default Graph
