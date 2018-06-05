import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withTheme } from 'material-ui/styles'
import s from './NoteComponent.scss'

function WithTheme(props) {
  const { theme } = props
  const primaryText = theme.palette.text.primary
  const primaryColor = theme.palette.primary.main
}

const NoteComponent = (props) => {
  return (
    <section className={s.root}>
      <TextField
        id="textarea"
        label="Notes"
        rows={15}
        placeholder="Place notes here"
        multiline
        fullWidth
      />
    </section>
  )
}

NoteComponent.propTypes = {

}

export default withTheme()(NoteComponent)
