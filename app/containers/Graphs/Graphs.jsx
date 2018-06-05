import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Graphs extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)

    this.state = {
      counts: 0,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.increaseCounts, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  increaseCounts = () => {
    this.setState({
      counts: this.state.counts += 1,
    })
  }

  render() {
    return <div>{this.state.counts}</div>
  }
}

export default Graphs
