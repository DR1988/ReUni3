// @flow
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import s from './MainComponent.scss'
import MainForm from '../../containers/MainForm'
import Graphs from '../../containers/Graphs'
import FormChoserComponent from './FormChoserComponent'

type State = {
  current: string,
}

const AppForms = ({ currentForm }) => (
  <Fragment>
    <div
      className={
        cn({ [s.show]: currentForm === 'MainForm' },
           { [s.hide]: currentForm !== 'MainForm' })}
    >
      <MainForm />
    </div>
    <div
      className={
        cn({ [s.show]: currentForm === 'Graphs' },
           { [s.hide]: currentForm !== 'Graphs' })}
    >
      <Graphs />
    </div>
  </Fragment>
)

class MainComponent extends Component<Props, State> {
  constructor(props:Props) {
    super(props)
    this.state = {
      currentForm: 'MainForm',
    }
  }

  updateForm = (currentForm) => {
    this.setState({
      currentForm,
    })
  }

  render() {
    const { currentForm } = this.state
    return (
      <div className={s.root}>
        <FormChoserComponent
          updateForm={this.updateForm}
        />
        <AppForms currentForm={currentForm} />
      </div>
    )
  }
}

MainComponent.propTypes = {
  currentForm: PropTypes.string.isRequired,
  updateForm: PropTypes.func.isRequired,
}

export default MainComponent
