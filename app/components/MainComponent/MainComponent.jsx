// @flow
import React, { Component } from 'react'

import s from './MainComponent.scss'
import FormChoserComponent from './FormChoserComponent'
import AppForms from './AppForms'

type State = {
  currentForm: string,
}

type Props = {}

type AppFormsProps = {
  currentForm: string,
}

class MainComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      currentForm: 'MainForm',
    }
  }

  updateForm = (currentForm: string) => {
    if (currentForm !== this.state.currentForm) {
      this.setState({
        currentForm,
      })
    }
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

export default MainComponent
