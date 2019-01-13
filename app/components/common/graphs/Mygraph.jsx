// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ScaleRect from './helpers'

type Props = {
  width: number,
  height: number,
  animatable: boolean,
  scaleFactor: number,
  maxScale: number,
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
    mirrorX: -1 | 1,
    mirrorY: -1 | 1,
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
      isScaling: false,
      tranformM: 'translate(0 0) scale(1)',
      scale: 1,
      coords: {
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        width: 1,
        height: 1,
        initialX: 0,
        initialY: 0,
        mirrorX: 1,
        mirrorY: 1,
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

  _mouseDown = (evn: SyntheticMouseEvent<T>) => {
    const event = evn.nativeEvent
    if (event.which === 1) {
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
  }

  _drawRect = (evn) => {
    const cursorpt = this._getCoordinates(evn)
    const { initialX, initialY, scaleX: currentScaleX, scaleY: currentScaleY } = this.state.coords
    const width = (cursorpt.x - initialX)
    const height = (cursorpt.y - initialY)
    const mirrorX = width < 0 ? -1 : 1
    const mirrorY = height < 0 ? -1 : 1

    let curscaleX = 1
    let curscaleY = 1
    if (mirrorX > 0 && mirrorY > 0) {
      curscaleX = (800 / width).toFixed(2)
      curscaleY = (300 / height).toFixed(2)
      // translateX = mirrorX * -scaleX * initialX
      // translateY = mirrorY * -scaleY * initialY
    } else {
      curscaleX = -(currentScaleX * (width * currentScaleX / 800)).toFixed(2)
      curscaleY = -(currentScaleY * (height * currentScaleY / 300)).toFixed(2)
      // console.log('scaleX', scaleX)
      // translateX = mirrorX * (800 - initialX * currentScaleX) / scaleX
      // translateY = 300 - initialY
    }

    this.setState({
      curscaleX,
      curscaleY,
      coords: {
        ...this.state.coords,
        width: mirrorX * width,
        height: mirrorY * height,
        mirrorX,
        mirrorY,
      },
    })
  }

  _mouseUp = () => {
    const {
      width,
      height,
      initialX,
      initialY,
      mirrorX,
      mirrorY,
      scaleX: currentScaleX,
      scaleY: currentScaleY,
    } = this.state.coords
    let scaleX = 1
    let scaleY = 1
    let translateX = 0
    let translateY = 0
    if (mirrorX > 0 && mirrorY > 0) {
      scaleX = 800 / width
      scaleY = 300 / height
      translateX = mirrorX * -scaleX * initialX
      translateY = mirrorY * -scaleY * initialY
    } else {
      scaleX = currentScaleX * (width * currentScaleX / 800)
      scaleY = currentScaleY * (height * currentScaleY / 300)
      console.log(800 - initialX, currentScaleX)
      // translateX = mirrorX * (800 - initialX * currentScaleX) / scaleX
      // translateY = mirrorY * (300 - initialY * currentScaleY) / scaleY
      translateX = mirrorX * (initialX - 400)
      translateY = mirrorY * (initialY - 150)

    }
    if (scaleX < 1) {
      scaleX = 1
      translateX = 0
    }
    if (scaleY < 1) {
      scaleY = 1
      translateY = 0
    }
    // scaleX = mirrorX > 0 ? 800 / width : currentScaleX * (width * currentScaleX / 800)
    // scaleY = mirrorY > 0 ? 300 / height : currentScaleY * (height * currentScaleY / 300)
    // console.log(scaleX, width, width * currentScaleX, width * currentScaleX / 800)
    // console.log(translateX)
    const tranformM =
      `translate(${translateX} ${translateY}) scale(${scaleX} ${scaleY})`
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
    // }
  }

  _onwheel = (e: MouseEvent) => {
    // console.log(e.deltaY)
    const cursorpt = this._getCoordinates(e)
    const { coords } = this.state
    const { scaleFactor, maxScale } = this.props
    const resize = e.deltaY < 0 ? -1 : 1
    let scale = (coords.scale - resize * scaleFactor).toFixed(2)
    // let scaleY = coords.scaleY - resize * scaleFactor
    // console.log(scaleX)
    let initialX
    let initialY
    if (scale > maxScale || scale < 1) {
      if (scale < 1) scale = 1
      if (scale > maxScale) scale = maxScale
      initialX = coords.initialX
      initialY = coords.initialY
    } else {
      initialX = coords.initialX + cursorpt.x * resize * scaleFactor
      initialY = coords.initialY + cursorpt.y * resize * scaleFactor
    }
    const tranformM =
      `translate(${initialX} ${initialY}) scale(${scale} ${scale})`
    this.setState({
      tranformM,
      coords: {
        ...coords,
        scale,
        initialX,
        initialY,
        // scaleX,
        // scaleY,
      },
    })
    // } else {
    //   let scaleX = coords.scaleX * 0.9
    //   let scaleY = coords.scaleY * 0.9
    //   if (scaleX < 1) scaleX = 1
    //   if (scaleY < 1) scaleY = 1
    //   const tranformM =
    //   `translate(${coords.initialX} ${coords.initialX}) scale(${scaleX} ${scaleY})`
    //   this.setState({
    //     tranformM,
    //     coords: {
    //       ...coords,
    //       scaleX,
    //       scaleY,
    //     },
    //   })
    // }
  }

  render() {
    const { isScaling, coords, tranformM, curscaleX, curscaleY } = this.state
    const step = 5
    const { children, animatable } = this.props
    return (
      <div style={{ border: '1px solid red', width: 800 }}>
        <h1 style={{ position: 'absolute', top: '340px' }}>scaleX:{curscaleX}</h1>
        <h1 style={{ position: 'absolute', top: '370px' }}>scaleY:{curscaleY}</h1>
        <svg
          style={{ display: 'block' }}
          width="100%" height="300" ref={this.svgRef}
          viewBox="0 0 800 300"
          onWheel={this._onwheel}
        // onMouseDown={this._mouseDown}
        // onMouseUp={isScaling ? this._mouseUp : f => f}
        // onMouseMove={isScaling ? this._drawRect : f => f}
        // onMouseLeave={isScaling ? this._mouseUp : f => f}
        >
          <g
            style={{ transition: animatable ? 'transform 1s' : '' }}
            transform={tranformM}
          // transform={`translate(${coords.initialX * coords.initialX} ${coords.initialY * coords.initialY}) scale(${coords.scaleX} ${coords.scaleY})`}
          >
            <rect width="100%" height="100%" fill="transparent" />
            {children}
            {isScaling ?
              <ScaleRect
                coords={coords}
                strokeWidth={2}
                stroke="green"
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
