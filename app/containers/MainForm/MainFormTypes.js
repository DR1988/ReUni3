// @flow
export type Changes = Array<{
  startTime: number,
  endTime: number,
  id: number,
  duration: number,
  waitForValue?: boolean,
  gapTime: number,
}>

export type ValveLineType = {
  name: 'ValveLine' | 'RPMSetter' | 'TempSetter',
  id: number,
  shortName: string,
  changes: Changes,
}
export type LineFormer = Array<ValveLineType>

export type State = {
  distance: number,
  time: number,
  showEditModal: boolean,
  lineFormer: LineFormer,
}
