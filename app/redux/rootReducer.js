import { combineReducers } from 'redux'

import counter from './counter'
import mainReducer from '../containers/Main/mainRedux'
import mainFormReducer from '../containers/MainForm/mainFormRedux'

export default combineReducers({
  counter,
  mainReducer,
  mainFormReducer,
})
