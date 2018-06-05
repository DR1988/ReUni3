import React from 'react'
import s from './FormChoserComponent.scss'
import PropTypes from 'prop-types'

const FormChoserComponent = ({ updateForm }) => (
  <div className={s.root}>
    <button onClick={() => updateForm('MainForm')}>MainForm</button>
    <button onClick={() => updateForm('Graphs')}>Graphs</button>
  </div>
)

FormChoserComponent.propTypes = {
  updateForm: PropTypes.func.isRequired,
}

export default FormChoserComponent
