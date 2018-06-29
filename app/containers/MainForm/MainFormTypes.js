// @flow
export type Change ={
  startTime: number,
  endTime: number,
  changeId: : number | string,
  duration: number,
  waitForValue?: boolean,
  crossingValueStart: number,
  crossingValueEnd: number,
}

export type ValveLineType = {
  name: 'ValveLine' | 'RPMSetter' | 'TempSetter' | 'NewValveLine' | 'NewRPMSetter' | 'NewTempSetter',
  id: number,
  shortName: string,
  changes: Array<Change>,
}
export type LineFormer = Array<ValveLineType>

export type ChosenElement = {
  chosenLine: ValveLineType,
  previousChanges: Array<Change>,
  changeId: number | string,
  newElement: boolean,
  wrongSign: string,
  newStartTime: number,
  newEndTime: number,
}

export type State = {
  chosenElement: ChosenElement,
  distance: number,
  time: number,
  allTime: number,
  showEditModal: boolean,
  lineFormer: LineFormer,
}
