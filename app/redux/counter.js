import { createTypes, createActions, handleActions } from '../utils/reduxUtils'

export const types = createTypes([
  'INCREMENT',
  'INCREMENT_ASYNC',
  'RESET',
], 'COUNTER')

const initialState = {
  value: 0,
  request: false,
}

export const actions = createActions(types)
export const selectCounter = state => state.counter

const reducer = handleActions({
  [types.INCREMENT_ASYNC]: state => ({
    ...state,
    request: true,
  }),
  [types.INCREMENT]: (state, { payload }) => (
    {
      value: state.value + payload,
      request: false,
    }),
  [types.RESET]: () => initialState,
}, initialState)

export default reducer

