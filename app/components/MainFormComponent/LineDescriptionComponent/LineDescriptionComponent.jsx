import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'
import Slide from 'material-ui/transitions/Slide'

import s from './LineDescriptionComponent.scss'

import LineDescription from './LineDescription'

class LineDescriptionComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      elem: {},
      transition: null,
    }
  }

  transitionRight = props =>
    <Slide direction="right" {...props} timeout={300} />

  showElem = (elem, transition) => {
    this.setState({
      elem,
      transition,
    })
  }

  hideElem = () => {
    this.setState({
      elem: {},
    })
  }

  render() {
    const { lineFormer } = this.props
    return (
      <aside
        className={s.root}
      >
        {lineFormer.map(elem => {
          return (<div className={s.description} key={elem.id}>
            <p
              className={s.sign}
              onClick={() => this.showElem(elem, this.transitionRight)}
            >
              {elem.ShortName}
            </p>
            <LineDescription
              valve={elem.ShortName}
              currenrtElem={this.state.elem}
              transition={this.state.transition}
              handleClose={this.hideElem}
            />
          </div>)
        })}
      </aside>
    )
  }
}

LineDescriptionComponent.propTypes = {

}

export default LineDescriptionComponent
