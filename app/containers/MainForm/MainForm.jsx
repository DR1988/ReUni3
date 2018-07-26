// @flow
import React, { Component } from 'react' // eslint-disable-line
// import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'
import shortid from 'shortid'

import MainFormComponent from '../../components/MainFormComponent'
import type { ValveLineType, Change, ChosenElement, LineFormer } from './MainFormTypes'
import Modal from '../../components/Modal'
import ValveLineModal from '../../components/Modal/ValveLineModal'
import NewValveLineModal from '../../components/Modal/NewValveLineModal'
import RMPModal from '../../components/Modal/RMPModal'
import NewRMPModal from '../../components/Modal/NewRMPModal'
import NewTempModal from '../../components/Modal/NewTempModal'
import TempModal from '../../components/Modal/TempModal'

import { withCondition } from '../../components/HOC'

const ModalWithCondition = withCondition(props => <Modal {...props} />)

type Props = {}
type State = {
  chosenElement: ChosenElement,
  distance: number,
  time: number,
  allTime: number,
  showEditModal: boolean,
  lineFormer: LineFormer,
}
class MainForm extends Component<Props, State> {
  static propTypes = {

  }
  constructor(props: Props) {
    super(props)
    this.initialState = {
      chosenElement: {
        wrongSign: '',
        chosenLine: {
          name: 'ValveLine',
          id: 0,
          shortName: 'GV1',
          changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, crossingValueEnd: NaN, crossingValueStart: NaN }],
        },
        newStartTime: 0,
        newEndTime: 0,
        previousChanges: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, crossingValueEnd: NaN, crossingValueStart: NaN }],
        changeId: 0,
        newElement: false,
      },
      distance: 0,
      time: 0,
      showEditModal: false,
      allTime: 0,
      lineFormer: [
        {
          name: 'ValveLine',
          id: 0,
          shortName: 'GV1',
          changes: [],
        },
        {
          name: 'ValveLine',
          id: 1,
          shortName: 'GV2',
          changes: [],
        },
        {
          name: 'ValveLine',
          id: 2,
          shortName: 'GV3',
          changes: [],
        },
        {
          name: 'ValveLine',
          id: 3,
          shortName: 'GV4',
          changes: [],
        },
        {
          name: 'ValveLine',
          id: 4,
          shortName: 'GV5',
          changes: [],
        },
        {
          name: 'ValveLine',
          id: 5,
          shortName: 'GV6',
          changes: [],
        },
        {
          name: 'ValveLine',
          id: 6,
          shortName: 'HV1',
          changes: [],
        },
        {
          name: 'ValveLine',
          id: 7,
          shortName: 'HV2',
          changes: [],
        },
        {
          name: 'RPMSetter',
          shortName: 'RPM',
          id: 8,
          changes: [],
        },
        {
          name: 'TempSetter',
          shortName: 'T°C',
          id: 9,
          changes: [],
        },
      ],
    }
  }

  state = {
    chosenElement: {
      chosenLine: {
        name: 'RPMSetter',
        id: 8,
        shortName: 'RPM',
        changes: [{
          startTime: 300,
          endTime: 350,
          value: 1000,
          changeId: 0,
          duration: 50,
          waitForValue: true,
          crossingValueEnd: NaN,
          crossingValueStart: NaN,
        }],
      },
      newStartTime: 0,
      newEndTime: 0,
      previousChanges: [],
      newElement: false,
      changeId: 0,
      wrongSign: '',
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
          { startTime: 0, endTime: 10, changeId: 0, duration: 10, crossingValueEnd: NaN, crossingValueStart: NaN },
          { startTime: 20, endTime: 80, changeId: 1, duration: 60, crossingValueEnd: NaN, crossingValueStart: NaN },
          { startTime: 120, endTime: 240, changeId: 2, duration: 120, crossingValueEnd: NaN, crossingValueStart: NaN },
          { startTime: 290, endTime: 340, changeId: 3, duration: 50, crossingValueEnd: NaN, crossingValueStart: NaN },
        ],
      },
      {
        name: 'ValveLine',
        id: 1,
        shortName: 'GV2',
        changes: [{ startTime: 30, endTime: 50, changeId: 0, duration: 20, crossingValueEnd: NaN, crossingValueStart: NaN }],
      },
      {
        name: 'ValveLine',
        id: 2,
        shortName: 'GV3',
        changes: [{ startTime: 0, endTime: 10, changeId: 0, duration: 10, crossingValueEnd: NaN, crossingValueStart: NaN }],
      },
      {
        name: 'ValveLine',
        id: 3,
        shortName: 'GV4',
        changes: [],
      },
      {
        name: 'ValveLine',
        id: 4,
        shortName: 'GV5',
        changes: [],
      },
      {
        name: 'ValveLine',
        id: 5,
        shortName: 'GV6',
        changes: [],
      },
      {
        name: 'ValveLine',
        id: 6,
        shortName: 'HV1',
        changes: [{ startTime: 0, endTime: 100, changeId: 0, duration: 100, crossingValueEnd: NaN, crossingValueStart: NaN }],
      },
      {
        name: 'ValveLine',
        id: 7,
        shortName: 'HV2',
        changes: [{ startTime: 0, endTime: 100, changeId: 0, duration: 100, crossingValueEnd: NaN, crossingValueStart: NaN }],
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
            waitForValue: true,
            crossingValueEnd: NaN,
            crossingValueStart: NaN,
          },
        ],
      },
      {
        name: 'TempSetter',
        shortName: 'T°C',
        id: 9,
        changes: [{ startTime: 300, endTime: 350, value: 45, changeId: 0, duration: 50, crossingValueEnd: NaN, crossingValueStart: NaN }],
      },
    ],
  }

  setChosenValveTime = (lineID: number, changeId: number): void => {
    const chosenLine: ValveLineType = this.state.lineFormer.filter(line => line.id === lineID)[0]
    // console.log('chosenLine.changes', chosenLine)
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

  setWrongSign = (sign: string): string => {
    const { chosenElement: { wrongSign } } = this.state
    return wrongSign || sign
  }

  addNewValveTime = (chosenLine: ValveLineType): void => {
    this.setState({
      chosenElement: {
        ...this.state.chosenElement,
        chosenLine: {
          ...chosenLine,
          name: `New${chosenLine.name}`,
        },
        newEndTime: 0,
        newStartTime: 0,
        newRPMValue: 0,
        newTempValue: 0,
        changeId: shortid.generate(),
        newElement: true,
        previousChanges: [...chosenLine.changes],
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
      chosenElement: {
        ...this.state.chosenElement,
        wrongSign: '',
      },
    })
  }

  resetToPreviousChanges = () => {
    const { chosenElement, lineFormer } = this.state
    const { chosenLine } = chosenElement

    const newlineFormer: LineFormer = cloneDeep(lineFormer)
    newlineFormer[chosenLine.id].changes = [...chosenElement.previousChanges]
    const maxTime = Math.max(...newlineFormer.map((lines) => {
      if (lines.changes.length) {
        return lines.changes[lines.changes.length - 1].endTime
      }
      return 0
    }))
    this.setState({
      ...this.state,
      lineFormer: newlineFormer,
      allTime: maxTime,
    })
  }

  removeValveTime = () => {
    const { chosenElement, lineFormer } = this.state
    const { chosenLine, changeId } = chosenElement

    const changes = chosenLine.changes.filter(change => change.changeId !== changeId)
    const newChosenElement = {
      ...chosenElement,
      chosenLine: {
        ...chosenLine,
        changes,
      },
    }

    const newlineFormer = cloneDeep(lineFormer)
    newlineFormer[chosenLine.id].changes = changes
    this.setState({
      ...this.state,
      lineFormer: newlineFormer,
      showEditModal: false,
      chosenElement: newChosenElement,
    })
  }

  changeEndTime = (value: number): void => {
    const { chosenElement, lineFormer } = this.state
    const { changeId, chosenLine, previousChanges } = chosenElement

    const index = lineFormer[chosenLine.id].changes.findIndex(change => change.changeId === changeId)
    const startTime = lineFormer[chosenLine.id].changes[index].startTime

    const newlineFormer = cloneDeep(lineFormer)
    newlineFormer[chosenLine.id].changes[index].endTime = value
    newlineFormer[chosenLine.id].changes[index].duration = startTime - value
    const newChosenLine: ValveLineType = cloneDeep(chosenLine)
    newChosenLine.changes[index].endTime = value
    newChosenLine.changes[index].duration = startTime - value

    if (newChosenLine.changes[index + 1]) {
      let wrongSign = ''
      if (newChosenLine.changes[index + 1].startTime <= value) {
        newlineFormer[chosenLine.id].changes[index].crossingValueEnd = newChosenLine.changes[index + 1].startTime - value
        newChosenLine.changes[index].crossingValueEnd = newChosenLine.changes[index + 1].startTime - value
        wrongSign = 'your changed value crossing next valve open time'
      } else if (chosenLine.changes[index + 1].startTime > value) {
        newChosenLine.changes[index].crossingValueEnd = NaN
        newlineFormer[chosenLine.id].changes[index].crossingValueEnd = NaN
        wrongSign = ''
      }
      this.setState({
        ...this.state,
        lineFormer: newlineFormer,
        chosenElement: {
          ...this.state.chosenElement,
          wrongSign,
          chosenLine: newChosenLine,
        },
      })
      return
    }

    const maxTime = Math.max(...newlineFormer.map(lines => {
      if (lines.changes.length) {
        return lines.changes[lines.changes.length - 1].endTime
      }
      return 0
    }))
    const allTime = value > maxTime ? value : maxTime

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
    const { changeId, chosenLine } = chosenElement

    const index = lineFormer[chosenLine.id].changes.findIndex(change => change.changeId === changeId)
    const endTime = lineFormer[chosenLine.id].changes[index].endTime

    const newlineFormer = cloneDeep(lineFormer)
    newlineFormer[chosenLine.id].changes[index].startTime = value
    newlineFormer[chosenLine.id].changes[index].duration = endTime - value
    const newChosenLine: ValveLineType = cloneDeep(chosenLine)
    newChosenLine.changes[index].startTime = value
    newChosenLine.changes[index].duration = endTime - value

    if (newChosenLine.changes[index - 1]) {
      let wrongSign = ''
      if (newChosenLine.changes[index - 1].endTime >= value) {
        newlineFormer[chosenLine.id].changes[index].crossingValueStart = newChosenLine.changes[index - 1].endTime - value
        newChosenLine.changes[index].crossingValueStart = newChosenLine.changes[index - 1].endTime - value
        wrongSign = 'your changed value crossing previous valve open time'
      } else if (chosenLine.changes[index - 1].endTime < value) {
        newChosenLine.changes[index].crossingValueStart = NaN
        newlineFormer[chosenLine.id].changes[index].crossingValueStart = NaN
        wrongSign = ''
      }
      this.setState({
        ...this.state,
        lineFormer: newlineFormer,
        chosenElement: {
          ...this.state.chosenElement,
          wrongSign,
          chosenLine: newChosenLine,
        },
      })
      return
    }
    this.setState({
      ...this.state,
      lineFormer: newlineFormer,
      chosenElement: {
        ...this.state.chosenElement,
        chosenLine: newChosenLine,
      },
    })
  }

  insertItem = (array: Array<Change>, index: number, change: Change): Array<Change> => {
    const newArray = array.slice()
    newArray.splice(index, 0, {
      startTime: change.startTime,
      endTime: change.endTime,
      changeId: change.changeId,
      duration: change.duration,
      crossingValueEnd: NaN,
      crossingValueStart: NaN,
    })
    return newArray
  }

  changeNewStartTime = (newStartTime: number): void => {
    const { chosenElement, lineFormer } = this.state
    const { chosenLine, previousChanges, newEndTime, changeId } = chosenElement
    const { changes } = chosenLine
    if (!previousChanges.length) {
      const currentItemIndex = 0
      const filteredChange = changes.filter(change => change.changeId !== changeId)
      const newChanges =
        this.insertItem(filteredChange, currentItemIndex,
          {
            startTime: newStartTime,
            endTime: newEndTime,
            changeId,
            duration: newEndTime - newStartTime,
          })
      const newlineFormer = cloneDeep(lineFormer)
      newlineFormer[chosenLine.id].changes = newChanges
      newlineFormer[chosenLine.id].changes[currentItemIndex].duration = newEndTime - newStartTime
      const newChosenLine: ValveLineType = cloneDeep(chosenLine)
      newChosenLine.changes = newChanges
      newChosenLine.changes[currentItemIndex].duration = newEndTime - newStartTime
      this.setState({
        ...this.state,
        lineFormer: newlineFormer,
        chosenElement: {
          ...chosenElement,
          chosenLine: newChosenLine,
          newStartTime,
        },
      })
      return
    }
    let currentItemIndex = previousChanges.length
    if (newEndTime <= changes[previousChanges.length - 1].endTime) {
      for (let i = 0; i < previousChanges.length; i += 1) {
        if (newEndTime <= previousChanges[i].endTime) {
          currentItemIndex = i
          const filteredChange = changes.filter(change => change.changeId !== changeId)
          const newChanges =
            this.insertItem(filteredChange, currentItemIndex,
              {
                startTime: newStartTime,
                endTime: newEndTime,
                changeId,
                duration: newEndTime - newStartTime,
              })

          const newlineFormer = cloneDeep(lineFormer)
          newlineFormer[chosenLine.id].changes = newChanges
          newlineFormer[chosenLine.id].changes[currentItemIndex].duration = newEndTime - newStartTime
          const newChosenLine: ValveLineType = cloneDeep(chosenLine)
          newChosenLine.changes = newChanges
          newChosenLine.changes[currentItemIndex].duration = newEndTime - newStartTime

          let wrongSign = ''
          if (newChosenLine.changes[currentItemIndex + 1].startTime <= newEndTime) {
            newlineFormer[chosenLine.id].changes[currentItemIndex].crossingValueEnd = newChosenLine.changes[currentItemIndex + 1].startTime - newEndTime
            newChosenLine.changes[currentItemIndex].crossingValueEnd = newChosenLine.changes[currentItemIndex + 1].startTime - newEndTime
            wrongSign = 'your changed value crossing next valve open time'
          } else if (newChosenLine.changes[currentItemIndex + 1].startTime > newEndTime) {
            newChosenLine.changes[currentItemIndex].crossingValueEnd = NaN
            newlineFormer[chosenLine.id].changes[currentItemIndex].crossingValueEnd = NaN
          }

          const maxTime = Math.max(...newlineFormer.map((lines) => {
            if (lines.changes.length) {
              return lines.changes[lines.changes.length - 1].endTime
            }
            return 0
          }))
          const allTime = newEndTime > maxTime ? newEndTime : maxTime
          this.setState({
            ...this.state,
            lineFormer: newlineFormer,
            allTime,
            chosenElement: {
              ...chosenElement,
              chosenLine: newChosenLine,
              wrongSign,
              newStartTime,
            },
          })
          return
        }
      }
    }
    const filteredChange = changes.filter(change => change.changeId !== changeId)
    const newChanges =
      this.insertItem(filteredChange, currentItemIndex,
        {
          startTime: newStartTime,
          endTime: newEndTime,
          changeId,
          duration: newEndTime - newStartTime,
        })
    const newlineFormer = cloneDeep(lineFormer)
    newlineFormer[chosenLine.id].changes = newChanges
    newlineFormer[chosenLine.id].changes[currentItemIndex].duration = newEndTime - newStartTime
    const newChosenLine: ValveLineType = cloneDeep(chosenLine)
    newChosenLine.changes = newChanges
    newChosenLine.changes[currentItemIndex].duration = newStartTime - newEndTime

    let wrongSign = ''
    if (newChosenLine.changes[currentItemIndex - 1].endTime >= newStartTime) {
      newlineFormer[chosenLine.id].changes[currentItemIndex].crossingValueStart = newChosenLine.changes[currentItemIndex - 1].endTime - newStartTime
      newChosenLine.changes[currentItemIndex].crossingValueStart = newChosenLine.changes[currentItemIndex - 1].endTime - newStartTime
      wrongSign = 'your changed value crossing previous valve closing time'
    } else if (newChosenLine.changes[currentItemIndex - 1].endTime < newStartTime) {
      newChosenLine.changes[currentItemIndex].crossingValueStart = NaN
      newlineFormer[chosenLine.id].changes[currentItemIndex].crossingValueStart = NaN
    }

    this.setState({
      ...this.state,
      lineFormer: newlineFormer,
      chosenElement: {
        ...chosenElement,
        chosenLine: newChosenLine,
        wrongSign,
        newStartTime,
      },
    })
  }

  changeNewEndTime = (newEndTime: number): void => {
    const { chosenElement, lineFormer } = this.state
    const { chosenLine, previousChanges, newStartTime, changeId } = chosenElement
    const { changes } = chosenLine
    if (!previousChanges.length) {
      const currentItemIndex = 0
      const filteredChange = changes.filter(change => change.changeId !== changeId)
      const newChanges =
        this.insertItem(filteredChange, currentItemIndex,
          {
            startTime: newStartTime,
            endTime: newEndTime,
            changeId,
            duration: newEndTime - newStartTime,
          })
      const newlineFormer = cloneDeep(lineFormer)
      newlineFormer[chosenLine.id].changes = newChanges
      newlineFormer[chosenLine.id].changes[currentItemIndex].duration = newEndTime - newStartTime
      const newChosenLine: ValveLineType = cloneDeep(chosenLine)
      newChosenLine.changes = newChanges
      newChosenLine.changes[currentItemIndex].duration = newEndTime - newStartTime
      const maxTime = Math.max(...newlineFormer.map((lines) => {
        if (lines.changes.length) {
          return lines.changes[lines.changes.length - 1].endTime
        }
        return 0
      }))
      const allTime = newEndTime > maxTime ? newEndTime : maxTime

      this.setState({
        ...this.state,
        lineFormer: newlineFormer,
        allTime,
        chosenElement: {
          ...chosenElement,
          chosenLine: newChosenLine,
          newEndTime,
        },
      })
      return
    }

    let currentItemIndex = previousChanges.length
    if (newStartTime <= changes[previousChanges.length - 1].startTime) {
      for (let i = 0; i < previousChanges.length; i += 1) {
        if (newStartTime <= previousChanges[i].startTime) {
          currentItemIndex = i
          const filteredChange = changes.filter(change => change.changeId !== changeId)
          const newChanges =
            this.insertItem(filteredChange, currentItemIndex,
              {
                startTime: newStartTime,
                endTime: newEndTime,
                changeId,
                duration: newEndTime - newStartTime,
              })

          const newlineFormer = cloneDeep(lineFormer)
          newlineFormer[chosenLine.id].changes = newChanges
          newlineFormer[chosenLine.id].changes[currentItemIndex].duration = newEndTime - newStartTime
          const newChosenLine: ValveLineType = cloneDeep(chosenLine)
          newChosenLine.changes = newChanges
          newChosenLine.changes[currentItemIndex].duration = newEndTime - newStartTime

          let wrongSign = ''
          if (newChosenLine.changes[currentItemIndex + 1].startTime <= newEndTime) {
            newlineFormer[chosenLine.id].changes[currentItemIndex].crossingValueEnd = newChosenLine.changes[currentItemIndex + 1].startTime - newEndTime
            newChosenLine.changes[currentItemIndex].crossingValueEnd = newChosenLine.changes[currentItemIndex + 1].startTime - newEndTime
            wrongSign = 'your changed value crossing next valve open time'
          } else if (newChosenLine.changes[currentItemIndex + 1].startTime > newEndTime) {
            newChosenLine.changes[currentItemIndex].crossingValueEnd = NaN
            newlineFormer[chosenLine.id].changes[currentItemIndex].crossingValueEnd = NaN
          }

          const maxTime = Math.max(...newlineFormer.map((lines) => {
            if (lines.changes.length) {
              return lines.changes[lines.changes.length - 1].endTime
            }
            return 0
          }))
          const allTime = newEndTime > maxTime ? newEndTime : maxTime
          this.setState({
            ...this.state,
            lineFormer: newlineFormer,
            allTime,
            chosenElement: {
              ...chosenElement,
              chosenLine: newChosenLine,
              wrongSign,
              newEndTime,
            },
          })
          return
        }
      }
    }
    const filteredChange = changes.filter(change => change.changeId !== changeId)
    const newChanges =
      this.insertItem(filteredChange, currentItemIndex,
        {
          startTime: newStartTime,
          endTime: newEndTime,
          changeId,
          duration: newEndTime - newStartTime,
        })

    const newlineFormer = cloneDeep(lineFormer)
    newlineFormer[chosenLine.id].changes = newChanges
    newlineFormer[chosenLine.id].changes[currentItemIndex].duration = newEndTime - newStartTime
    const newChosenLine: ValveLineType = cloneDeep(chosenLine)
    newChosenLine.changes = newChanges
    newChosenLine.changes[currentItemIndex].duration = newStartTime - newEndTime
    let wrongSign = ''
    if (newChosenLine.changes[currentItemIndex - 1].endTime >= newStartTime) {
      newlineFormer[chosenLine.id].changes[currentItemIndex].crossingValueStart =
        newChosenLine.changes[currentItemIndex - 1].endTime - newStartTime
      newChosenLine.changes[currentItemIndex].crossingValueStart =
        newChosenLine.changes[currentItemIndex - 1].endTime - newStartTime
      wrongSign = 'your changed value crossing next valve open time'
    } else if (newChosenLine.changes[currentItemIndex - 1].endTime < newStartTime) {
      newChosenLine.changes[currentItemIndex].crossingValueStart = NaN
      newlineFormer[chosenLine.id].changes[currentItemIndex].crossingValueStart = NaN
    }
    const maxTime = Math.max(...newlineFormer.map((lines) => {
      if (lines.changes.length) {
        return lines.changes[lines.changes.length - 1].endTime
      }
      return 0
    }))
    const allTime = newEndTime > maxTime ? newEndTime : maxTime

    this.setState({
      ...this.state,
      lineFormer: newlineFormer,
      allTime,
      chosenElement: {
        ...chosenElement,
        wrongSign,
        chosenLine: newChosenLine,
        newEndTime,
      },
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

  changeRPMValue = (RPMValue: number) => {
    const { chosenElement, lineFormer } = this.state
    const { changeId, chosenLine } = chosenElement
    const index = lineFormer[chosenLine.id].changes.findIndex(change => change.changeId === changeId)

    if (RPMValue >= 0) {
      const newlineFormer = cloneDeep(lineFormer)
      newlineFormer[chosenLine.id].changes[index].value = RPMValue
      const newChosenLine: ValveLineType = cloneDeep(chosenLine)
      newChosenLine.changes[index].value = RPMValue
      this.setState({
        ...this.state,
        lineFormer: newlineFormer,
        chosenElement: {
          ...this.state.chosenElement,
          chosenLine: newChosenLine,
        },
      })
    }
  }

  changeTempValue = (TempValue: number) => {
    const { chosenElement, lineFormer } = this.state
    const { changeId, chosenLine } = chosenElement
    const index = lineFormer[chosenLine.id].changes.findIndex(change => change.changeId === changeId)

    if (TempValue >= 0) {
      const newlineFormer = cloneDeep(lineFormer)
      newlineFormer[chosenLine.id].changes[index].value = TempValue
      const newChosenLine: ValveLineType = cloneDeep(chosenLine)
      newChosenLine.changes[index].value = TempValue
      this.setState({
        ...this.state,
        lineFormer: newlineFormer,
        chosenElement: {
          ...this.state.chosenElement,
          chosenLine: newChosenLine,
        },
      })
    }
  }

  changeNewRPMValue = (RPMValue: number) => {
    const { chosenElement, lineFormer } = this.state
    const { changeId, chosenLine } = chosenElement
    const index = lineFormer[chosenLine.id].changes.findIndex(change => change.changeId === changeId)
    if (RPMValue >= 0) {
      const newlineFormer = cloneDeep(lineFormer)
      newlineFormer[chosenLine.id].changes[index].value = RPMValue
      const newChosenLine: ValveLineType = cloneDeep(chosenLine)
      newChosenLine.changes[index].value = RPMValue
      this.setState({
        ...this.state,
        lineFormer: newlineFormer,
        chosenElement: {
          ...this.state.chosenElement,
          newRPMValue: RPMValue,
          chosenLine: newChosenLine,
        },
      })
    }
  }

  changeNewTempValue = (TempValue: number) => {
    const { chosenElement, lineFormer } = this.state
    const { changeId, chosenLine } = chosenElement
    const index = lineFormer[chosenLine.id].changes.findIndex(change => change.changeId === changeId)
    if (TempValue >= 0) {
      const newlineFormer = cloneDeep(lineFormer)
      newlineFormer[chosenLine.id].changes[index].value = TempValue
      const newChosenLine: ValveLineType = cloneDeep(chosenLine)
      newChosenLine.changes[index].value = TempValue
      this.setState({
        ...this.state,
        lineFormer: newlineFormer,
        chosenElement: {
          ...this.state.chosenElement,
          newTempValue: TempValue,
          chosenLine: newChosenLine,
        },
      })
    }
  }


  render() {
    const { chosenElement, lineFormer, showEditModal } = this.state
    const { changeId, chosenLine } = chosenElement
    // console.log('chosenLine', chosenLine)
    // console.log('chosenElement', chosenElement)
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
        condition={showEditModal}
        render={() => {
          switch (chosenElement.chosenLine.name) {
            case 'ValveLine':
              return (<ValveLineModal
                removeValveTime={this.removeValveTime}
                chosenElement={chosenElement}
                closeModal={this.closeModal}
                changeEndTime={this.changeEndTime}
                changeStartTime={this.changeStartTime}
                resetToPreviousChanges={this.resetToPreviousChanges}
              />)
            case 'NewValveLine':
              return (<NewValveLineModal
                removeValveTime={this.removeValveTime}
                chosenElement={chosenElement}
                closeModal={this.closeModal}
                resetToPreviousChanges={this.resetToPreviousChanges}
                changeNewStartTime={this.changeNewStartTime}
                changeNewEndTime={this.changeNewEndTime}
              />)
            case 'RPMSetter':
              return (<RMPModal
                removeValveTime={this.removeValveTime}
                chosenElement={chosenElement}
                closeModal={this.closeModal}
                changeRPMValue={this.changeRPMValue}
                resetToPreviousChanges={this.resetToPreviousChanges}
                changeStartTime={this.changeStartTime}
                changeEndTime={this.changeEndTime}
              />)
            case 'NewRPMSetter':
              return (<NewRMPModal
                removeValveTime={this.removeValveTime}
                chosenElement={chosenElement}
                closeModal={this.closeModal}
                changeRPMValue={this.changeNewRPMValue}
                resetToPreviousChanges={this.resetToPreviousChanges}
                changeStartTime={this.changeNewStartTime}
                changeEndTime={this.changeNewEndTime}
              />)
            case 'TempSetter':
              return (<TempModal
                removeValveTime={this.removeValveTime}
                chosenElement={chosenElement}
                closeModal={this.closeModal}
                changeTempValue={this.changeTempValue}
                resetToPreviousChanges={this.resetToPreviousChanges}
                changeStartTime={this.changeStartTime}
                changeEndTime={this.changeEndTime}
              />)
            case 'NewTempSetter':
              return (<NewTempModal
                removeValveTime={this.removeValveTime}
                chosenElement={chosenElement}
                closeModal={this.closeModal}
                changeTempValue={this.changeNewTempValue}
                resetToPreviousChanges={this.resetToPreviousChanges}
                changeStartTime={this.changeNewStartTime}
                changeEndTime={this.changeNewEndTime}
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
