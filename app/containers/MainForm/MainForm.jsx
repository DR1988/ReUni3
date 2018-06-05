import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actions } from './mainFormRedux'
import MainFormComponent from '../../components/MainFormComponent'

class MainForm extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)
    this.formWidth = 1000
  }

  state = {
    distance: 0,
    time: 0,
  }

  closeModal = () => {
    console.log('closeModal')
  }
  resetState = () => {
    console.log('resetState')
  }
  setSelected = () => {
    console.log('setSelected')
  }
  showModal = () => {
    console.log('showModal')
  }
  updateForm = () => {
    console.log('updateForm')
  }

  render() {
    return (<div
      id="form-Manupalation"
    >
      <MainFormComponent
        {...this.props}
        distance={this.state.distance}
        time={this.state.time}
      />
    </div>
    )
  }
}

const mapStateToProps = state => ({ mainForm: state.mainFormReducer })

export default connect(mapStateToProps, actions)(MainForm)
