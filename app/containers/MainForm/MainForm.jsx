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
          changes: [{ startTime: 0, endTime: 20, changeId: 0, duration: 20, crossingValueEnd: NaN, crossingValueStart: NaN }],
        },
        newStartTime: 0,
        newEndTime: 0,
        previousChanges: [{ startTime: 0, endTime: 20, changeId: 0, duration: 20, crossingValueEnd: NaN, crossingValueStart: NaN }],
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
          changes: [{ startTime: 0, endTime: 20, changeId: 0, duration: 20, crossingValueEnd: NaN, crossingValueStart: NaN }],
        },
        {
          name: 'ValveLine',
          id: 1,
          shortName: 'GV2',
          changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, crossingValueEnd: NaN, crossingValueStart: NaN }],
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
          changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, crossingValueEnd: NaN, crossingValueStart: NaN }],
        },
        {
          name: 'ValveLine',
          id: 4,
          shortName: 'GV5',
          changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, crossingValueEnd: NaN, crossingValueStart: NaN }],
        },
        {
          name: 'ValveLine',
          id: 5,
          shortName: 'GV6',
          changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, crossingValueEnd: NaN, crossingValueStart: NaN }],
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
  }

  state = {
    chosenElement: {
      chosenLine: {
        name: 'ValveLine',
        id: 0,
        shortName: 'GV1',
        changes: [{ startTime: 0, endTime: 20, changeId: 0, duration: 20, crossingValueEnd: NaN, crossingValueStart: NaN }],
      },
      newStartTime: 0,
      newEndTime: 0,
      previousChanges: [{ startTime: 0, endTime: 20, changeId: 0, duration: 20, crossingValueEnd: NaN, crossingValueStart: NaN }],
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
        changes: [{ startTime: 30, endTime: 40, changeId: 0, duration: 10, crossingValueEnd: NaN, crossingValueStart: NaN }],
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
        changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, crossingValueEnd: NaN, crossingValueStart: NaN }],
      },
      {
        name: 'ValveLine',
        id: 4,
        shortName: 'GV5',
        changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, crossingValueEnd: NaN, crossingValueStart: NaN }],
      },
      {
        name: 'ValveLine',
        id: 5,
        shortName: 'GV6',
        changes: [{ startTime: 0, endTime: 0, changeId: 0, duration: 0, crossingValueEnd: NaN, crossingValueStart: NaN }],
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
          name: 'NewValveLine',
        },
        newEndTime: 0,
        newStartTime: 0,
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
    const maxTime = Math.max(...newlineFormer.map(lines => lines.changes[lines.changes.length - 1].endTime))
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
    const { changeId, chosenLine } = chosenElement

    const startTime = lineFormer[chosenLine.id].changes[changeId].startTime
    if (value <= startTime) {
      this.setState({
        ...this.state,
        chosenElement: {
          ...this.state.chosenElement,
          wrongSign: 'end time should be greater than start time',
        },
      })
      return
    }
    const newlineFormer = cloneDeep(lineFormer)
    newlineFormer[chosenLine.id].changes[changeId].endTime = value
    newlineFormer[chosenLine.id].changes[changeId].duration = startTime - value
    const newChosenLine: ValveLineType = cloneDeep(chosenLine)
    newChosenLine.changes[changeId].endTime = value
    newChosenLine.changes[changeId].duration = startTime - value

    let wrongSign = ''
    if (newChosenLine.changes[changeId + 1].startTime <= value) {
      newlineFormer[chosenLine.id].changes[changeId].crossingValueEnd = newChosenLine.changes[changeId + 1].startTime - value
      newChosenLine.changes[changeId].crossingValueEnd = newChosenLine.changes[changeId + 1].startTime - value
      wrongSign = 'your changed value crossing next valve open time'
    } else if (chosenLine.changes[changeId + 1].startTime > value) {
      newChosenLine.changes[changeId].crossingValueEnd = NaN
      newlineFormer[chosenLine.id].changes[changeId].crossingValueEnd = NaN
    }

    const maxTime = Math.max(...newlineFormer.map(lines => lines.changes[lines.changes.length - 1].endTime))
    const allTime = value > maxTime ? value : maxTime

    this.setState({
      ...this.state,
      lineFormer: newlineFormer,
      allTime,
      chosenElement: {
        ...this.state.chosenElement,
        wrongSign: this.setWrongSign(wrongSign),
        chosenLine: newChosenLine,
      },
    })
  }

  changeStartTime = (value: number): void => {
    const { chosenElement, lineFormer } = this.state
    const { changeId, chosenLine } = chosenElement

    const endTime = lineFormer[chosenLine.id].changes[changeId].endTime
    if (value >= endTime) {
      this.setState({
        ...this.state,
        chosenElement: {
          ...this.state.chosenElement,
          wrongSign: 'start time should be less than end time',
        },
      })
      return
    }
    const newlineFormer = cloneDeep(lineFormer)
    newlineFormer[chosenLine.id].changes[changeId].startTime = value
    newlineFormer[chosenLine.id].changes[changeId].duration = endTime - value
    const newChosenLine: ValveLineType = cloneDeep(chosenLine)
    newChosenLine.changes[changeId].startTime = value
    newChosenLine.changes[changeId].duration = endTime - value

    let wrongSign = ''
    if (newChosenLine.changes[changeId - 1].endTime >= value) {
      newlineFormer[chosenLine.id].changes[changeId].crossingValueStart = newChosenLine.changes[changeId - 1].endTime - value
      newChosenLine.changes[changeId].crossingValueStart = newChosenLine.changes[changeId - 1].endTime - value
      wrongSign = 'your changed value crossing previous valve open time'
    } else if (chosenLine.changes[changeId - 1].endTime < value) {
      newChosenLine.changes[changeId].crossingValueStart = NaN
      newlineFormer[chosenLine.id].changes[changeId].crossingValueStart = NaN
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
    const { chosenLine, previousChanges, newEndTime } = chosenElement
    const { changes } = chosenLine
    this.setState({
      chosenElement: {
        ...chosenElement,
        wrongSign: '',
        newStartTime,
      },
    })
    // newStartValue: number,
    // newEndValue: number,
    // console.log(chosenLine)
    // let inserted
    // for (let i = 0; i < changes.length; i += 1) {
    //   // const element = array[changeId];
    //   console.log(value)
    //   if (changes[i].startTime > value) {
    //     inserted = this.insertItem(changes, { index: i, value })
    //     break
    //   }
    // }
    // console.log(inserted)
    // if (inserted) {
    //   const newlineFormer = cloneDeep(lineFormer)
    //   newlineFormer[chosenLine.id].changes = inserted
    //   const newChosenLine: ValveLineType = cloneDeep(chosenLine)
    //   newChosenLine.changes = inserted
    //   newChosenLine.changes = inserted
    //   this.setState({
    //     ...this.state,
    //     lineFormer: newlineFormer,
    //     chosenElement: {
    //       ...this.state.chosenElement,
    //       chosenLine: newChosenLine,
    //     },
    //   })
    // }
  }

  changeNewEndTime = (newEndTime: number): void => {
    const { chosenElement, lineFormer } = this.state
    const { chosenLine, previousChanges, newStartTime, changeId } = chosenElement
    const { changes } = chosenLine
    // console.log('changeId', changeId)
    if (newEndTime > newStartTime) {
      // console.log(newStartTime)
      for (let i = 0; i < changes.length; i += 1) {
          // const element = array[changeId];
        // if (changes[i].startTime > newEndTime && changes[i - 1].endTime < newStartTime) { // for i > 0
        //   console.log('ok')
        //   break
        // }
        if (changes[i].startTime <= newEndTime) {
          const filteredChange = changes.filter(change => change.changeId !== changeId)
          const newChanges =
            this.insertItem(filteredChange, i + 1,
              { startTime: newStartTime,
                endTime: newEndTime,
                changeId,
                duration: newEndTime - newStartTime,
              })

          const newlineFormer = cloneDeep(lineFormer)
          newlineFormer[chosenLine.id].changes = newChanges
          newlineFormer[chosenLine.id].changes[i + 1].duration = newEndTime - newStartTime
          const newChosenLine: ValveLineType = cloneDeep(chosenLine)
          newChosenLine.changes = newChanges
          newChosenLine.changes[i + 1].duration = newStartTime - newEndTime

          let wrongSign = ''
          if (newChosenLine.changes[i + 2].startTime <= newEndTime) {
            newlineFormer[chosenLine.id].changes[i + 1].crossingValueEnd = newChosenLine.changes[i + 2].startTime - newEndTime
            newChosenLine.changes[i + 1].crossingValueEnd = newChosenLine.changes[i + 2].startTime - newEndTime
            wrongSign = 'your changed value crossing next valve open time'
          } else if (chosenLine.changes[i + 2].startTime > newEndTime) {
            newChosenLine.changes[i + 1].crossingValueEnd = NaN
            newlineFormer[chosenLine.id].changes[i + 1].crossingValueEnd = NaN
          }

          const maxTime = Math.max(...newlineFormer.map(lines => lines.changes[lines.changes.length - 1].endTime))
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
          // console.log(newChanges)
          break
        }
      }
      return
    }
    this.setState({
      chosenElement: {
        ...chosenElement,
        newEndTime,
      },
    })
    // newStartValue: number,
    // newEndValue: number,
    // console.log(chosenLine)
    // let inserted
    // for (let i = 0; i < changes.length; i += 1) {
    //   // const element = array[changeId];
    //   console.log(value)
    //   if (changes[i].startTime > value) {
    //     inserted = this.insertItem(changes, { index: i, value })
    //     break
    //   }
    // }
    // console.log(inserted)
    // if (inserted) {
    //   const newlineFormer = cloneDeep(lineFormer)
    //   newlineFormer[chosenLine.id].changes = inserted
    //   const newChosenLine: ValveLineType = cloneDeep(chosenLine)
    //   newChosenLine.changes = inserted
    //   newChosenLine.changes = inserted
    //   this.setState({
    //     ...this.state,
    //     lineFormer: newlineFormer,
    //     chosenElement: {
    //       ...this.state.chosenElement,
    //       chosenLine: newChosenLine,
    //     },
    //   })
    // }
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
