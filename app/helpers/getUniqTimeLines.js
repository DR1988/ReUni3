  import sortBy from './sortBymultipleFields.js'

  export default(elem) => {
    // TODO: setting next start time less then previus endtime not overwrite previus one
    let resultchanges = []//eslint-disable-line
/*
    if (elem.id === 7) {
      console.log('%c**************before*****************', 'color: green; font-weight: bold;')//eslint-disable-line
      elem.changes.forEach(elems => {
        console.log(elems.id, '*******************************')//eslint-disable-line
        console.log(`start %c ${elems.startTime}`, 'color: green; font-weight: bold;')//eslint-disable-line
        console.log(`stop %c  ${elems.endTime}`, 'color: red; font-weight: bold;')//eslint-disable-line
        console.log(`duration %c ${elems.duration}`, 'color: blue; font-weight: bold;')//eslint-disable-line
      })
    }
*/

    elem.changes.sort(sortBy('startTime', {
      name: 'duration',
      primer: parseInt,
      reverse: true,
    }))

    for (let i = 0; i < elem.changes.length; i++) {
      if (i + 1 < elem.changes.length) {
        for (let j = i + 1; j < elem.changes.length; j++) {
          if (elem.changes[i].startTime === elem.changes[j].startTime
           || elem.changes[i].endTime > elem.changes[j].endTime) {
            elem.changes.splice(j, 1)
          }
          if (elem.changes[j]) {
            if (elem.changes[i].endTime < elem.changes[j].endTime
            && elem.changes[i].endTime > elem.changes[j].startTime) {
              elem.changes[i].endTime = elem.changes[j].endTime//eslint-disable-line
              elem.changes[i].duration = elem.changes[i].endTime - elem.changes[i].startTime//eslint-disable-line
              elem.changes.splice(j, 1)
            }
          }
        }
      }
      resultchanges = elem.changes
    }
    // return resultchanges
    return {
      resultchanges,
      elementId: elem.id,
      name: elem.name,
    }
  }
