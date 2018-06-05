import { createTypes, createActions, handleActions } from '../../utils/reduxUtils'

export const types = createTypes([
  'UPDATE_FORM',
  'RESET_STATE',
  'SHOW_MODAL',
  'CLOSE_MODAL',
  'SET_SELECTED',
], 'MAINFORM')

const resetState = {
  showEditModal: false,
  allTime: 0,
  lineFormer: [
    { name: 'ValveLine',
      id: 0,
      ShortName: 'GV1',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 1,
      ShortName: 'GV2',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 2,
      ShortName: 'GV3',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 3,
      ShortName: 'GV4',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 4,
      ShortName: 'GV5',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 5,
      ShortName: 'GV6',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 6,
      ShortName: 'HV1',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 7,
      ShortName: 'HV2',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'RPMSetter',
      ShortName: 'RPM',
      id: 8,
      changes: [{ startTime: 0, endTime: 0, value: 0, id: 0, duration: 0 }] },
    { name: 'TempSetter',
      ShortName: 'T°C',
      id: 9,
      changes: [{ startTime: 0, endTime: 0, value: 0, id: 0, duration: 0 }] },
  ],
}

const initialState = {
  showEditModal: false,
  allTime: 400,
  selected: {},
  lineFormer: [
    { name: 'ValveLine',
      id: 0,
      ShortName: 'GV1',
      changes: [{ startTime: 0, endTime: 10, id: 0, duration: 10 },
               { startTime: 20, endTime: 130, id: 1, duration: 110 },
               { startTime: 220, endTime: 400, id: 2, duration: 180 }] },
    { name: 'ValveLine',
      id: 1,
      ShortName: 'GV2',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 2,
      ShortName: 'GV3',
      changes: [{ startTime: 0, endTime: 10, id: 0, duration: 10 },
               { startTime: 120, endTime: 130, id: 1, duration: 10 },
               { startTime: 320, endTime: 400, id: 2, duration: 80 }] },
    { name: 'ValveLine',
      id: 3,
      ShortName: 'GV4',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 4,
      ShortName: 'GV5',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 5,
      ShortName: 'GV6',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 6,
      ShortName: 'HV1',
      changes: [{ startTime: 0, endTime: 100, id: 0, duration: 100 },
               { startTime: 150, endTime: 200, id: 1, duration: 50 },
               { startTime: 200, endTime: 300, id: 2, duration: 50 }] },
    { name: 'ValveLine',
      id: 7,
      ShortName: 'HV2',
      changes: [{ startTime: 0, endTime: 100, id: 0, duration: 100 },
               { startTime: 150, endTime: 200, id: 1, duration: 50 },
               { startTime: 250, endTime: 300, id: 2, duration: 50 }] },
    { name: 'RPMSetter',
      ShortName: 'RPM',
      id: 8,
      changes: [
        { startTime: 0, endTime: 50, value: 1500, id: 0, duration: 50 },
        { startTime: 75, endTime: 150, value: 1000, id: 1, duration: 75 },
        { startTime: 200, endTime: 250, value: 4000, id: 2, duration: 50 },
        { startTime: 300, endTime: 350, value: 1000, id: 3, duration: 50, waitForValue: true },
      ] },
    { name: 'TempSetter',
      ShortName: 'T°C',
      id: 9,
      changes: [{ startTime: 0, endTime: 50, value: 15, id: 0, duration: 50 },
                { startTime: 100, endTime: 150, value: 25, id: 1, duration: 50 },
                { startTime: 175, endTime: 275, value: 35, id: 2, duration: 100 },
                { startTime: 300, endTime: 350, value: 45, id: 3, duration: 50 },
      ] },
  ],
}

export const actions = createActions(types)
// export const selectCounter = state => state.counter
const reducer = handleActions({
  [types.UPDATE_FORM]: (state, { payload }) => ({
    ...state,
    currentForm: payload,
  }),
  [types.RESET_STATE]: state => ({
    ...state,
    ...resetState,
  }),
  [types.SHOW_MODAL]: state => ({
    ...state,
    showEditModal: true,
  }),
  [types.CLOSE_MODAL]: state => ({
    ...state,
    showEditModal: false,
  }),
  [types.SET_SELECTED]: (state, { payload }) => ({
    ...state,
    selected: payload,
  }),
}, initialState)

export default reducer

