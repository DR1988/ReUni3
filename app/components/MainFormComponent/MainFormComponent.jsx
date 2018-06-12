// @flow
import React, { Component } from 'react'
import s from './MainFormComponent.scss'

import LineDescriptionComponent from './LineDescriptionComponent'
import TimeLine from './TimeLineComponent'
import NoteComponent from './NoteComponent'
import ReactionFlowComponent from './ReactionFlowComponent'
import ValveLineComponent from './ValveLineComponent'

type ValveLine = {
  name: 'ValveLine' | 'RPMSetter' | 'TempSetter',
  id: number,
  shortName: string,
  changes: Array<{
    startTime: number,
    endTime: number,
    id: number,
    duration: number,
    gapTime: number,
    waitForValue?: boolean,
  }>
}

type Props = {
  distance: number,
  time: number,
  showEditModal: boolean,
  lineFormer: Array<ValveLine>,
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
      resetState
    } = this.props
    // console.log(lineFormer[0].changes[1])
    return (
      <div id="mainForm" className={s.mainForm}>
        <section className={s.sidebar}>
          <NoteComponent />
          <ReactionFlowComponent />
        </section>
        <section className={s['form-container']}>
          <LineDescriptionComponent lineFormer={lineFormer} />
          <section className={s['lines-keeper']}>
            {lineFormer.map(elem => <ValveLineComponent
              key={elem.id}
              line={elem}
              allTime={allTime}
              showModal={showModal}
              closeModal={closeModal}
            />,
            )}
            <TimeLine
              distance={distance}
              time={time}
              allTime={allTime}
            />
            <div className={s.buttons} >
              <button onClick={resetState} >Reset</button>
            </div>
          </section>
        </section>
      </div>
    )
  }
}

MainFormComponent.propTypes = {

}

export default MainFormComponent
