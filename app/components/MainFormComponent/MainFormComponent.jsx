// @flow
import React, { Component } from 'react'
import s from './MainFormComponent.scss'

import LineDescriptionComponent from './LineDescriptionComponent'
import TimeLine from './TimeLineComponent'
import NoteComponent from './NoteComponent'
import ReactionFlowComponent from './ReactionFlowComponent'
import ValveLineComponent from './ValveLineComponent'
import type { ValveLineType } from '../../containers/MainForm/MainFormTypes'
import ValveTimeComponentAdder from './ValveTimeComponentAdder'

type Props = {
  distance: number,
  time: number,
  showEditModal: boolean,
  lineFormer: Array<ValveLineType>,
}

type State = {}
class MainFormComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const {
      mainForm,
      handle,
      distance,
      time,
      lineFormer,
      allTime,
      showModal,
      closeModal,
      resetState,
      addNewValveTime,
      setChosenValveTime,
      start,
      chosenElement,
      pause,
    } = this.props
    // console.log('this.props', this.props)

    // console.log(lineFormer[0].changes[1]
    return (
      <div id="mainForm" className={s.mainForm}>
        <section className={s.sidebar}>
          <NoteComponent />
          <ReactionFlowComponent />
        </section>
        <section className={s['form-container']}>
          <LineDescriptionComponent lines={lineFormer} />
          <section className={s['lines-keeper']}>
            {lineFormer.map(elem => <ValveLineComponent
              key={elem.id}
              line={elem}
              allTime={allTime}
              showModal={showModal}
              closeModal={closeModal}
              addNewValveTime={addNewValveTime}
              setChosenValveTime={setChosenValveTime}
              chosenElement={chosenElement}
            />,
            )}
            <TimeLine
              distance={distance}
              time={time}
              allTime={allTime}
            />
            <div className={s.buttons} >
              <button onClick={resetState}>Reset</button>
              <button onClick={start}>Start</button>
              <button onClick={pause}>Pause</button>
            </div>
          </section>
          <ValveTimeComponentAdder
            lines={lineFormer}
            showModal={showModal}
            addNewValveTime={addNewValveTime}
          />
        </section>
      </div>
    )
  }
}

MainFormComponent.propTypes = {

}

export default MainFormComponent
