import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'Recharts'
import io from 'socket.io-client'

import { socketConfig } from '../../../config'

const socket = io(`${location.origin}`)

const arrays = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
]

class Graphs extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)

    this.state = {
      counts: 0,
      rmpValues: [/* {
        name: 'RPM',
        uv: 0,
      } */],
    }
  }

  componentDidMount() {
    socket.on(socketConfig.rpmChange, (data) => {
      const { rmpValue } = data
      // console.log('datas', data)
      this.setState({
        rmpValues: [...this.state.rmpValues, {
          name: 'RPM',
          rpm: data,
        }],
        counts: this.state.counts += 1,
        // rmpValues: [...this.state.rmpValues, rmpValue],
      })
    })
    // this.interval = setInterval(this.increaseCounts, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // increaseCounts = () => {
  //   this.setState({
  //     counts: this.state.counts += 1,
  //   })
  // }

  render() {
    const { rmpValues } = this.state
    // console.log('rmpValues', rmpValues);
    return (<div>{this.state.counts}
      <LineChart
        width={600} height={300} data={rmpValues}
        // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="rpm" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </div>)
  }
}

export default Graphs
