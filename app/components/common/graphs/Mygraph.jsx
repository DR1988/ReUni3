// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MyGraph.scss'

import ScaleRect from './helpers'

type Props = {
  width: number,
  height: number,
  animatable: boolean,
  scaleFactor: number,
  maxScale: number,
}

type State = {
  isMoving: boolean,
  tranformM: string,
  coords: {
    scale: number,
    translateX: number,
    translateY: number,
  },
}
class Graph extends Component<Props, State> {
  static defaultProps = {
    width: 800,
    height: 300,
    animatable: false,
    scaleFactor: 0.1,
    maxScale: 3,
  }

  cursorpt: {
    x: number,
    y: number,
  }

  constructor(props) {
    super(props)
    this.svgRef = React.createRef()
    this.state = {
      isMoving: false,
      tranformM: 'translate(0 0) scale(1)',
      coords: {
        scale: 1,
        translateX: 0,
        translateY: 0,
        prevX: 0,
        prevY: 0,
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

  _getCoordinates = (evn: MouseEvent) => {
    const { clientX, clientY } = evn
    this.svgpt.x = clientX
    this.svgpt.y = clientY
    console.log(evn.target)
    // this.svgRef.current
    const cursorpt = this.svgpt.matrixTransform(evn.target.getScreenCTM().inverse())
    return cursorpt
  }

  _mouseDown = (evn: SyntheticMouseEvent<T>) => {
    const event = evn.nativeEvent
    // console.log(evn.target)
    // this.svgRef.current.
    if (event.which === 1) {
      document.body.style.cursor = 'move'
      // console.log(cursorpt.x)
      // console.log(this.svgRef.current.children)
      // this.svgRef.current.children[0].style.pointerEvents = 'none'
      const cursorpt = this._getCoordinates(evn)
      // console.log(cursorpt)
      this.setState({
        isMoving: true,
        coords: {
          ...this.state.coords,
          prevX: cursorpt.x,
          prevY: cursorpt.y,
        },
      })
    }
  }

  _move = (evn) => {
    const { coords } = this.state
    const { prevX, prevY, scale, translateX, translateY } = coords
    const cursorpt = this._getCoordinates(evn)
    // console.log(cursorpt.x)
    // console.log(prevX)
    const newTranslateX = translateX + (cursorpt.x - prevX) /* * scale */
    const newTranslateY = translateY + (cursorpt.y - prevY) /* * scale */
    const newPrevY = cursorpt.y
    const newPrevX = cursorpt.x
    // console.log(cursorpt.x)
    const tranformM =
      `translate(${newTranslateX} ${newTranslateY}) scale(${scale} ${scale})`
    this.setState({
      tranformM,
      coords: {
        ...this.state.coords,
        translateX: newTranslateX,
        translateY: newTranslateY,
        prevX: newPrevX,
        prevY: newPrevY,
      },
    })
  }

  _mouseUp = () => {
    document.body.style.cursor = 'default'
    // this.svgRef.current.children[0].style.pointerEvents = 'auto'
    this.setState({
      isMoving: false,
    })
  }

  _onwheel = (e: MouseEvent) => {
    const cursorpt = this._getCoordinates(e)
    const { coords } = this.state
    const { scaleFactor, maxScale } = this.props
    const resize = e.deltaY < 0 ? -1 : 1
    let scale = (coords.scale - resize * scaleFactor).toFixed(2)
    let translateX
    let translateY
    if (scale > maxScale || scale < 1) {
      if (scale < 1) scale = 1
      if (scale > maxScale) scale = maxScale
      translateX = coords.translateX
      translateY = coords.translateY
    } else {
      console.log(cursorpt.x)
      translateX = coords.translateX + cursorpt.x * resize * scaleFactor
      translateY = coords.translateY + cursorpt.y * resize * scaleFactor
    }
    const tranformM =
      `translate(${translateX} ${translateY}) scale(${scale} ${scale})`
    this.setState({
      tranformM,
      coords: {
        ...coords,
        scale,
        translateX,
        translateY,
      },
    })
  }

  render() {
    const { isMoving, coords, tranformM } = this.state
    const step = 5
    const { children, animatable } = this.props
    return (
      <div style={{ border: '1px solid red', width: 800 }}>
        <h1 style={{ position: 'absolute', top: '340px' }}>scaleX:{coords.translateX}</h1>
        {/* <h1 style={{ position: 'absolute', top: '370px' }}>scaleY:{curscaleY}</h1> */}
        <svg
          style={{ display: 'block' }}
          width="100%" height="300" ref={this.svgRef}
          viewBox="0 0 800 300"
          onWheel={this._onwheel}
          onMouseDown={this._mouseDown}
          onMouseUp={this._mouseUp}
          onMouseMove={isMoving ? this._move : f => f}
          onMouseLeave={isMoving ? this._mouseUp : f => f}
        >
          <g
            style={{ transition: animatable ? 'transform 1s' : '' }}
            transform={tranformM}
          >
            <rect width="100%" height="100%" fill="transparent" />
            {children}
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
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -220 l ${step} 210 l ${step} -10 l ${step} 15
              l ${step} -12 l ${step} 8 l ${step} -14 l ${step} 18
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -220 l ${step} 210 l ${step} -10 l ${step} 15
              l ${step} -12 l ${step} 8 l ${step} -14 l ${step} 18
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 12 l ${step} -18 l ${step} 15
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 22
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 22
              l ${step} -22 l ${step} 12 l ${step} -18 l ${step} 15
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 22
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 22
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -22 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -13 l ${step} 11 l ${step} -10 l ${step} 15
              l ${step} -220 l ${step} 210 l ${step} -10 l ${step} 15
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
