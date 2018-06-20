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
    return (
      <div className={s.cover}>
        <div className={s.container}>
          <div className={s.content}>
            {this.props.render()}
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
