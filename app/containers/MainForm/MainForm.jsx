// @flow
import React, { Component } from 'react' // eslint-disable-line
// import PropTypes from 'prop-types'

import MainFormComponent from '../../components/MainFormComponent'
import type { State } from './MainFormTypes'

type Props = {}

class MainForm extends Component<Props, State> {
  static propTypes = {

  }
  constructor(props: Props) {
    super(props)
    // this.formWidth = 1000
    this.initialState = {
      distance: 0,
      time: 0,
      showEditModal: false,
      allTime: 100,
      selected: {},
      lineFormer: [
        {
          name: 'ValveLine',
          id: 0,
          shortName: 'GV1',
          changes: [{ startTime: 0, endTime: 20, id: 0, duration: 20, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 1,
          shortName: 'GV2',
          changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 2,
          shortName: 'GV3',
          changes: [{ startTime: 0, endTime: 10, id: 0, duration: 10, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 3,
          shortName: 'GV4',
          changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 4,
          shortName: 'GV5',
          changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 5,
          shortName: 'GV6',
          changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 6,
          shortName: 'HV1',
          changes: [{ startTime: 0, endTime: 100, id: 0, duration: 100, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 7,
          shortName: 'HV2',
          changes: [{ startTime: 0, endTime: 100, id: 0, duration: 100, gapTime: 0 }],
        },
        {
          name: 'RPMSetter',
          shortName: 'RPM',
          id: 8,
          changes: [
            {
              startTime: 300,
              endTime: 350,
              value: 1000,
              id: 0,
              duration: 50,
              gapTime: 0,
              waitForValue: true,
            },
          ],
        },
        {
          name: 'TempSetter',
          shortName: 'T°C',
          id: 9,
          changes: [{ startTime: 300, endTime: 350, value: 45, id: 0, duration: 50, gapTime: 0 }],
        },
      ],
    }
  }
  state = {
    distance: 0,
    time: 0,
    showEditModal: false,
    allTime: 100,
    selected: {},
    lineFormer: [
      {
        name: 'ValveLine',
        id: 0,
        shortName: 'GV1',
        changes: [{ startTime: 0, endTime: 10, id: 0, duration: 10, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 1,
        shortName: 'GV2',
        changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 2,
        shortName: 'GV3',
        changes: [{ startTime: 0, endTime: 10, id: 0, duration: 10, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 3,
        shortName: 'GV4',
        changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 4,
        shortName: 'GV5',
        changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 5,
        shortName: 'GV6',
        changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 6,
        shortName: 'HV1',
        changes: [{ startTime: 0, endTime: 100, id: 0, duration: 100, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 7,
        shortName: 'HV2',
        changes: [{ startTime: 0, endTime: 100, id: 0, duration: 100, gapTime: 0 }],
      },
      {
        name: 'RPMSetter',
        shortName: 'RPM',
        id: 8,
        changes: [
          {
            startTime: 300,
            endTime: 350,
            value: 1000,
            id: 3,
            duration: 50,
            gapTime: 0,
            waitForValue: true,
          },
        ],
      },
      {
        name: 'TempSetter',
        shortName: 'T°C',
        id: 9,
        changes: [{ startTime: 300, endTime: 350, value: 45, id: 3, duration: 50, gapTime: 0 }],
      },
    ],
  }

  setSelected = () => {
      ('setSelected')
  }
  initialState: State

  resetState = () => {
    console.log('reset')
    console.log('this.initialState', this.initialState.lineFormer[0].changes[0])
    this.setState({
      ...this.initialState,
    })
  }
  closeModal = () => {
    console.log('closeModal')
  }
  showModal = () => {
    console.log('showModal')
  }
  updateForm = () => {
    console.log('updateForm')
  }

  render() {
    // console.log('this.state', this.state.lineFormer[0].changes[1])
    return (<div
      id="form-Manupalation"
    >
      <MainFormComponent
        resetState={this.resetState}
        {...this.state}
      />
    </div>
    )
  }
}

export default MainForm
