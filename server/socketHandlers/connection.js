import { socketConfig } from '../../config'
import Controller from './controller'

let currentState = null

let controller = null

export default (socket, io) => {
  console.log('socket id', socket.id, '--------')
  if (!currentState) {
    controller = new Controller(socket, io)
  }
  if (currentState) {
    io.to(socket.id).emit(socketConfig.makeChange, currentState)
  }
  socket.on(socketConfig.makeChange, (msg) => {
    currentState = msg
    socket.broadcast.emit(socketConfig.makeChange, msg)
  })
  socket.on(socketConfig.start, data => controller.start(data))
  socket.on(socketConfig.pause, () => controller.pause())
  socket.on(socketConfig.stop, () => controller.stop())
}
