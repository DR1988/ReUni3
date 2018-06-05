import React, { Component } from 'react'
import s from './MainFormComponent.scss'
import PropTypes from 'prop-types'

import LineFormer from './LineFormerComponent'
import LineDescriptionComponent from './LineDescriptionComponent'
import TimeLine from './TimeLineComponent'
import NoteComponent from './NoteComponent'
import ReactionFlowComponent from './ReactionFlowComponent'
import ValveLineComponent from './ValveLineComponent'

class MainFormComponent extends Component {

  state = {
    timer: 0,
  }
  timers = null

  componentWillReceiveProps(nextProps) {
    if (!this.timers) this.setState({ timer: nextProps.time })
    if (nextProps.time && !this.state.timer) {
      this.timers = setInterval(() => {
        this.tick()
        if (!this.state.timer) { clearInterval(this.timers) }
      }, 1000)
    }
  }

  tick() {
    this.setState({
      timer: --this.state.timer,
      // timer: new Date().toLocaleTimeString(),
    })
  }
  render() {
    const {
      mainForm,
      handle,
      distance,
      time,
    } = this.props
    return (
      <div id="mainForm" className={s.mainForm}>
        {this.state.timer}
        <section className={s.sidebar}>
          <NoteComponent />
          <ReactionFlowComponent />
        </section>
        <section className={s['form-container']}>
          <LineDescriptionComponent lineFormer={mainForm.lineFormer} />
          <section className={s['lines-keeper']}>
            {mainForm.lineFormer.map(elem => <ValveLineComponent
              key={elem.id}
              elem={elem}
              allTime={mainForm.allTime}
              showModal={this.props.showModal}
              closeModal={this.props.closeModal}
            />,
            )}
            <TimeLine
              distance={distance}
              time={time}
              allTime={mainForm.allTime}
            />
          </section>
        </section>
      </div>
    )
  }
}

MainFormComponent.propTypes = {

}

export default MainFormComponent
