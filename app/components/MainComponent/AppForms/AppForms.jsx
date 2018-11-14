// @flow
import React, { Fragment } from 'react'
import cn from 'classnames'
import io from 'socket.io-client'

import s from './AppForms.scss'
import MainForm from '../../../containers/MainForm'
import Graphs from '../../../containers/Graphs'

const socket = io(`${location.origin}`)

type Props = {
  currentForm: string,
}

const AppForms = ({ currentForm }: Props) => (
  <Fragment>
    <div
      className={
        cn({ [s.show]: currentForm === 'MainForm' },
           { [s.hide]: currentForm !== 'MainForm' },
          )}
    >
      <MainForm />
    </div>
    <div
      className={
        cn({ [s.show]: currentForm === 'Graphs' },
           { [s.hide]: currentForm !== 'Graphs' })}
    >
      <Graphs />
    </div>
  </Fragment>
)

export default AppForms
