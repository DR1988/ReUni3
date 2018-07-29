// @flow
/*
  eslint-disable react/prop-types
*/
import React, { Component } from 'react'

import s from './Modal.scss'

type Props = {
  render: () => React$Element<React$ElementType>
}

class Modal extends Component<Props> {
  render() {
    // console.log(this.props)
    // const { top, bottom, left, right } = this.props.coordinate
    // console.log(bottom - top)
    return (
      <div className={s.cover}>
        <div
          // style={{
          //   marginTop: (bottom + top) / 2,
          // }}
          className={s.container}
        >
          <div className={s.content}>
            {this.props.render()}
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
