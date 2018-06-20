// @flow
import React, { Component } from 'react'
import s from './FormChoserComponent.scss'
import PropTypes from 'prop-types'

type Props = {
  updateForm: (s: string) => void,
  form?: string
}

type ButtonProps = {
  updateForm: (s:string) => void,
  form: string
}
class Button extends Component<ButtonProps> {
  constructor(props:ButtonProps) {
    super(props)
  }

  updateForm = () => {
    const { form, updateForm } = this.props
    updateForm(form)
  }
  render() {
    const { form } = this.props
    return (
      <button onClick={this.updateForm}>{form}</button>
    )
  }
}

const FormChoserComponent = (props: Props) => (
  <div className={s.root}>
    <Button form="MainForm" updateForm={props.updateForm} />
    <Button form="Graphs" updateForm={props.updateForm} />
  </div>
)

FormChoserComponent.propTypes = {
  updateForm: PropTypes.func.isRequired,
}

export default FormChoserComponent
