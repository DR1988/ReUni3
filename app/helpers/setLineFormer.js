export default(state, action) => state.lineFormer.map(changeElem => {
  if (changeElem.id !== action.id) {
    return changeElem
  }
  // if (changeElem.id === 7) {
  //   console.log('changeElem', changeElem)
  // }
  changeElem = { //eslint-disable-line
    ...changeElem,
    changes: [...changeElem.changes, { endTime: +action.payload.stop,
      startTime: +action.payload.start,
      value: +action.payload.value,
      duration: (+action.payload.stop) - (+action.payload.start),
      id: changeElem.changes.length,
      waitForValue: action.payload.waitForValue,
    }],
  }
  return {
    ...changeElem,
  }
}
)
