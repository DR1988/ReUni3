// @flow
import React, { Component } from 'react'

import s from './ValveTimeComponentAdder.scss'
import type { LineFormer, ValveLineType } from '../../../containers/MainForm/MainFormTypes'

type Props = {
  lines: LineFormer,
  showModal: () => void,
  addNewValveTime: (chosenLine: ValveLineType) => void,
}

type ButtonProps = {
  line: ValveLineType,
  showModal: () => void,
  addNewValveTime: (chosenLine: ValveLineType) => void,
}

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) { // eslint-disable-line
    super(props)
  }
  _choseLine = () => {
    const { showModal, addNewValveTime, line } = this.props
    showModal()
    addNewValveTime(line)
  }
  render() {
    return <button onClick={this._choseLine}>+</button>
  }
}

const ValveTimeComponentAdder = ({ lines, ...rest }: Props) => (
  <div className={s.root} >
    {lines.map(line => (
      <div key={line.id} className={s.button_container}>
        <Button line={line} {...rest} />
      </div>
    ))}
  </div>
)

export default ValveTimeComponentAdder
