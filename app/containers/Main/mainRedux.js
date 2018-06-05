import { createTypes, createActions, handleActions } from '../../utils/reduxUtils'

export const types = createTypes([
  'UPDATE_FORM',
], 'MAIN')

const initialState = {
  currentForm: 'MainForm',
}

export const actions = createActions(types)
// export const selectCounter = state => state.counter
const reducer = handleActions({
  [types.UPDATE_FORM]: (state, { payload }) => ({
    ...state,
    currentForm: payload,
  }),
}, initialState)

export default reducer

