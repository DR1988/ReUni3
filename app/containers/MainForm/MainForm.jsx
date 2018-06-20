// @flow
import React, { Component } from 'react' // eslint-disable-line
// import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'

import MainFormComponent from '../../components/MainFormComponent'
import type { State, ValveLineType, ChosenElement } from './MainFormTypes'
import Modal from '../../components/Modal'
import ValveLineModal from '../../components/Modal/ValveLineModal'
import { withCondition } from '../../components/HOC'

const ModalWithCondition = withCondition(props => <Modal {...props} />)

type Props = {}

class MainForm extends Component<Props, State> {
  static propTypes = {

  }
  constructor(props: Props) {
    super(props)
    this.initialState = {
      chosenElement: {
        chosenLine: {
          name: 'ValveLine',
          id: 0,
          shortName: 'GV1',
          changes: [{ startTime: 0, endTime: 20, changeId: 0, duration: 20, gapTime: 0 }],
        },
        previousChanges: [{ startTime: 0, endTime: 20, changeId: 0, duration: 20, gapTime: 0 }],
        changeId: 0,
        newElement: false,
      },
      distance: 0,
      time: 0,
      showEditModal: false,
      allTime: 350,
      lineFormer: [
        {
          name: 'ValveLine',
          id: 0,
          shortName: 'GV1',
          changes: [{ startTime: 0, endTime: 20, changeId: 0, duration: 20, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 1,
          shortName: 'GV2',
          changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 2,
          shortName: 'GV3',
          changes: [{ startTime: 0, endTime: 10, changeId: 0, duration: 10, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 3,
          shortName: 'GV4',
          changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 4,
          shortName: 'GV5',
          changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 5,
          shortName: 'GV6',
          changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 6,
          shortName: 'HV1',
          changes: [{ startTime: 0, endTime: 100, changeId: 0, duration: 100, gapTime: 0 }],
        },
        {
          name: 'ValveLine',
          id: 7,
          shortName: 'HV2',
          changes: [{ startTime: 0, endTime: 100, changeId: 0, duration: 100, gapTime: 0 }],
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
              changeId: 0,
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
          changes: [{ startTime: 300, endTime: 350, value: 45, changeId: 0, duration: 50, gapTime: 0 }],
        },
      ],
    }
  }

  state = {
    chosenElement: {
      chosenLine: {
        name: 'ValveLine',
        id: 0,
        shortName: 'GV1',
        changes: [{ startTime: 0, endTime: 20, changeId: 0, duration: 20, gapTime: 0 }],
      },
      previousChanges: [{ startTime: 0, endTime: 20, changeId: 0, duration: 20, gapTime: 0 }],
      newElement: false,
      changeId: 0,
    },
    distance: 0,
    time: 0,
    showEditModal: false,
    allTime: 350,
    lineFormer: [
      {
        name: 'ValveLine',
        id: 0,
        shortName: 'GV1',
        changes: [
          { startTime: 0, endTime: 10, changeId: 0, duration: 10, gapTime: 10 },
          { startTime: 20, endTime: 40, changeId: 1, duration: 20, gapTime: 0 },
        ],
      },
      {
        name: 'ValveLine',
        id: 1,
        shortName: 'GV2',
        changes: [{ startTime: 30, endTime: 40, changeId: 0, duration: 10, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 2,
        shortName: 'GV3',
        changes: [{ startTime: 0, endTime: 10, changeId: 0, duration: 10, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 3,
        shortName: 'GV4',
        changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 4,
        shortName: 'GV5',
        changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 5,
        shortName: 'GV6',
        changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 6,
        shortName: 'HV1',
        changes: [{ startTime: 0, endTime: 100, changeId: 0, duration: 100, gapTime: 0 }],
      },
      {
        name: 'ValveLine',
        id: 7,
        shortName: 'HV2',
        changes: [{ startTime: 0, endTime: 100, changeId: 0, duration: 100, gapTime: 0 }],
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
            changeId: 0,
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
        changes: [{ startTime: 300, endTime: 350, value: 45, changeId: 0, duration: 50, gapTime: 0 }],
      },
    ],
  }

  setChosenValveTime = (lineID: number, changeId: number): void => {
    const chosenLine: ValveLineType = this.state.lineFormer.filter(line => line.id === lineID)[0]
    // console.log('chosenLine.changes', chosenLine.changes)
    this.setState({
      chosenElement: {
        ...this.state.chosenElement,
        chosenLine,
        changeId,
        newElement: false,
        previousChanges: [...chosenLine.changes],
      },
    })
  }

  addNewValveTime = (chosenLine: ValveLineType): void => {
    this.setState({
      chosenElement: {
        ...this.state.chosenElement,
        chosenLine,
        changeId: 0,
        newElement: true,
        previousChanges: [],
      },
    })
  }

  initialState: State

  resetState = () => {
    this.setState({
      ...this.initialState,
    })
  }

  closeModal = () => {
    this.setState({
      showEditModal: false,
    })
  }

  resetToPreviousChanges = () => {
    const { chosenElement, lineFormer } = this.state
    const { chosenLine } = chosenElement
    const newlineFormer: LineFormer = cloneDeep(lineFormer)
    newlineFormer[chosenLine.id].changes = [...chosenElement.previousChanges]
    // console.log(lineFormer[chosenLine.id].changes[changeId])
    const maxTime = Math.max(...newlineFormer.map(lines => lines.changes[lines.changes.length - 1].endTime))

    this.setState({
      ...this.state,
      lineFormer: newlineFormer,
      allTime: maxTime,
      // lineFormer,
    })
  }

  removeValveTime = (chosenElement: ChosenElement) => {
    const { changeId, chosenLine } = chosenElement
    let line = this.state.lineFormer[chosenLine.id]
    const changes = line.changes.filter(change => change.changeId !== changeId)
    line = {
      ...line,
      changes,
    }
    const lineFormer = this.state.lineFormer
    this.state.lineFormer[chosenLine.id] = line
    this.setState({
      ...this.state,
      lineFormer,
      showEditModal: false,
    })
  }

  changeEndTime = (value: number): void => {
    const { chosenElement, lineFormer } = this.state
    const { changeId, chosenLine } = chosenElement

    const startTime = lineFormer[chosenLine.id].changes[changeId].startTime
    const newlineFormer = cloneDeep(lineFormer)
    newlineFormer[chosenLine.id].changes[changeId].duration = value
    const endTime = startTime + value
    newlineFormer[chosenLine.id].changes[changeId].endTime = endTime

    const newChosenLine: ValveLineType = cloneDeep(chosenLine)
    newChosenLine.changes[changeId].endTime = endTime
    newChosenLine.changes[changeId].duration = value

    const maxTime = Math.max(...newlineFormer.map(lines => lines.changes[lines.changes.length - 1].endTime))
    const allTime = endTime > maxTime ? endTime : maxTime

    // newlineFormer[chosenLine.id].changes[changeId].startTime = 333333
    // console.log('lineFormer', lineFormer[chosenLine.id].changes[changeId])
    console.log('newChosenLine', newChosenLine)
    this.setState({
      ...this.state,
      lineFormer: newlineFormer,
      allTime,
      chosenElement: {
        ...this.state.chosenElement,
        chosenLine: newChosenLine,
      },
    })
  }

  changeStartTime = (value: number): void => {
    const { chosenElement, lineFormer } = this.state
    // console.log('chosenElement', chosenElement)
    const { changeId, chosenLine } = chosenElement
    lineFormer[chosenLine.id].changes[changeId].startTime = value
    this.setState({
      ...this.state,
      lineFormer,
    })
  }

  showModal = () => {
    if (!this.state.showEditModal) {
      this.setState({
        ...this.state,
        showEditModal: true,
      })
    }
  }

  render() {
    const { chosenElement, lineFormer } = this.state
    const { changeId, chosenLine } = chosenElement
    console.log('lineFormer', lineFormer[chosenLine.id].changes[changeId])
    console.log('chosenElement', chosenElement)
    return (<div
      id="form-Manupalation"
    >
      <MainFormComponent
        resetState={this.resetState}
        showModal={this.showModal}
        addNewValveTime={this.addNewValveTime}
        setChosenValveTime={this.setChosenValveTime}
        {...this.state}
      />
      <ModalWithCondition
        condition={this.state.showEditModal}
        render={() => {
          switch (this.state.chosenElement.chosenLine.name) {
            case 'ValveLine':
              return (<ValveLineModal
                removeValveTime={this.removeValveTime}
                chosenElement={chosenElement}
                closeModal={this.closeModal}
                changeEndTime={this.changeEndTime}
                changeStartTime={this.changeStartTime}
                resetToPreviousChanges={this.resetToPreviousChanges}
              />)
            default: return <div>asd</div>
          }
          // return (<ValveLineModal
          //   chosenLine={this.state.chosenLine}
          //   closeModal={this.closeModal}
          // />)
        }}
      />
    </div>
    )
  }
}

export default MainForm
