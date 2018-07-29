import { socketConfig } from '../../config'

export default (data, socket, io) => {
  const lines = []
  const velocity = 4
  let intervalId
  const linesOfActions = data.lineFormer
  const counter = { distance: 0, time: 0 }

  console.log('linesOfActions', linesOfActions)
  // console.log('req.body', linesOfActions[8].changes)
  // console.log(linesOfActions)
  for (let j = 0; j < linesOfActions.length; j++) {
    if (linesOfActions[j].changes.length) {
      for (let i = 0; i < linesOfActions[j].changes.length; i++) {
        linesOfActions[j].changes[i].idname = linesOfActions[j].name[0] + linesOfActions[j].id
        lines.push(linesOfActions[j].changes[i])
      }
    }
  }

  // console.log('lines', lines)
  let currentTime = 0
  let sendingCommands = ''
  const start = () => {
    intervalId = setInterval(() => {
      lines.forEach(line => {
        if (line.startTime === currentTime) {
          // console.log(line.idname)
          if (line.idname === 'V0') {
            sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
          }
          if (line.idname === 'V1') {
            sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
          }
          if (line.idname === 'V2') {
            sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
          }
          if (line.idname === 'V3') {
            sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
          }
          if (line.idname === 'V4') {
            sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
          }
          if (line.idname === 'V5') {
            sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
          }
          if (line.idname === 'V6') {
            sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
          }
          if (line.idname === 'V7') {
            sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
          }
          if (line.idname === 'R8') {
            // console.log('RPM line sendind', line.idname, line.value)
            // if (line.waitForValue) {
            //   const curDistance = currentTime
            //   io.emit('STOP', {
            //     curDistance,
            //   })
            //   intervalId2 = setTimeout(() => {
            //     console.log('gavno gopa !!!!!!!!!!!!!!!!!!!')
            //     start()
            //     counter.distance = req.body.allTime
            //     counter.time = (req.body.allTime - curDistance) / velocity
            //     io.emit('START', {
            //       ...counter,
            //     })
            //   }, 3000)
            // console.log('intervalId2', intervalId2)
            // clearInterval(intervalId)
            // }
            sendingCommands = sendingCommands.concat(`${line.idname}${line.value}|`)
          }
          if (line.idname === 'T9') {
            sendingCommands = sendingCommands.concat(`${line.idname}${line.value}|`)
            // console.log('temperature line sending', line.idname, line.value)
          }
        } else if (line.endTime === currentTime) {
          if (line.idname === 'R8') {
            sendingCommands = sendingCommands.concat(`${line.idname}0|`)
            // console.log(line.idname, 0)
          }
          if (line.idname === 'T9') {
            sendingCommands = sendingCommands.concat(`${line.idname}0|`)
            // console.log(line.idname, 0)
          }
          if (/V\d+/.test(line.idname)) {
            // console.log('asdasdadasadasd')
            sendingCommands = sendingCommands.concat(`${line.idname}N|`)
          }
        }
      })
      if (sendingCommands) {
        console.log('sendingCommands = ', sendingCommands)
        // serialPort.write(`${sendingCommands}\n`)
        sendingCommands = ''
      }
      if (currentTime >= data.allTime) {
        clearInterval(intervalId)
      }
      ++currentTime
      // console.log(currentTime)
      // if (currentTime % 10 === 0) {
      //   // console.log('currentTime', currentTime)
      // }
    }, 1000 / velocity)
  }
  start()
  counter.distance = 100
  counter.time = data.allTime / velocity
  io.emit(socketConfig.start, counter)
  console.log('counter', counter.distance, counter.time)
}
