import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ValveLine extends Component {
  static propTypes = {

  }

  render() {
    return <div></div>
  }
}

const mapStateToProps = state => ({ mainForm: state.mainFormReducer })


export default connect(mapStateToProps)(ValveLine)
