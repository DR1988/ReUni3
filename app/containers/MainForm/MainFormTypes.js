// @flow
export type Change ={
  startTime: number,
  endTime: number,
  changeId: number,
  duration: number,
  waitForValue?: boolean,
  gapTime: number,
}

export type ValveLineType = {
  name: 'ValveLine' | 'RPMSetter' | 'TempSetter',
  id: number,
  shortName: string,
  changes: Array<Change>,
}
export type LineFormer = Array<ValveLineType>

export type ChosenElement = {
  chosenLine: ValveLineType,
  changeId: number,
  newElement: boolean,
  previousChanges: Array<Change>,
}

export type State = {
  chosenElement: ChosenElement,
  distance: number,
  time: number,
  allTime: number,
  showEditModal: boolean,
  lineFormer: LineFormer,
}
