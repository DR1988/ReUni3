import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import s from './LineDescription.scss'

const LineDecription = ({ valve, currenrtElem, transition, handleClose }) => {
  const descrioptionShow = (value) => {
    switch (value) {
      case 'GV1':
        return 'Inert gas inlet into reagent chamber 1'
      case 'GV2':
        return 'Inert Gas Outlet from reagent chamber 1'
      case 'GV3':
        return 'Inert gas inlet into reagent chamber 2'
      case 'GV4':
        return 'Inert Gas Outlet from reagent chamber 2'
      case 'GV5':
        return 'Inert gas inlet into reaction camera'
      case 'GV6':
        return 'Inert gas outlet from reaction camera'
      case 'HV1':
        return 'Inert Gas Inlet'
      case 'HV2':
        return 'Inert Gas Inlet'
      default:
        return 'Inert Gas'
    }
  }
  return (
    valve === currenrtElem.ShortName ?
      <Snackbar
        open={!!descrioptionShow(valve)}
        message={descrioptionShow(valve)}
        style={{
          right: 'inherit',
          left: 65,
          bottom: 'inherit',
          position: 'absolute',
          transform: 'none',
        }}
        onClose={handleClose}
        transition={transition}
        autoHideDuration={5000}
      />
     : null
  )
}

export default LineDecription
