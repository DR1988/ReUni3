import { socketConfig } from '../../config'

let currentState = null

export default (socket, io) => {
  console.log('socket id', socket.id, '--------')
  if (currentState) {
    io.to(socket.id).emit(socketConfig.makeChange, currentState)
  }
  socket.on(socketConfig.makeChange, (msg) => {
    currentState = msg
    socket.broadcast.emit(socketConfig.makeChange, msg)
  })
}
