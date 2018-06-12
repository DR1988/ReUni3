import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import purple from 'material-ui/colors/purple'

import MainComponent from '../../components/MainComponent'

// import Button from 'material-ui/Button';
const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
  typography: {
    body1: {
      fontSize: '1.5rem',
    },
    body2: {
      fontSize: '2.5rem',
    },
    display1: {
      fontSize: '1.5rem',
    },
    display2: {
      fontSize: '1.5rem',
    },
    display3: {
      fontSize: '1.5rem',
    },
    display4: {
      fontSize: '1.5rem',
    },
    caption: {
      fontSize: '2.5rem',
    },
    title: {
      fontSize: '2.5rem',
    },
    subheading: {
      fontSize: '1.5rem',
    },
    button: {
      fontWeight: 700,
    },
  },
})
const Main = props => (
  <MuiThemeProvider theme={theme}>
    <MainComponent {...props} />
  </MuiThemeProvider>
)

Main.propTypes = {
  currentForm: PropTypes.string.isRequired,
}



export default Main
