// @flow
import React, { Fragment } from 'react'
import cn from 'classnames'

import s from './AppForms.scss'
import MainForm from '../../../containers/MainForm'
import Graphs from '../../../containers/Graphs'

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

AppForms.propTypes = {

}

export default AppForms
