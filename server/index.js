import express from 'express'
import path from 'path'
import socket from 'socket.io'

import webpackMidlleware from './middlewares/webpack'
// import renderMiddleware from './middlewares/renderHTML'
import staticMiddleware from './middlewares/static'
import connection from './socketHandlers/connection'
import serial from './serial'

const app = express()
const http = require('http').Server(app)

const port = process.env.PORT ? process.env.PORT : 3000
// const host = process.env.host ? process.env.host : 'localhost'
 /* eslint-disable no-console */


app.use(webpackMidlleware)
app.use(staticMiddleware)
// app.use(renderMiddleware)
const io = socket(http)

io.on('connection', s => {
  connection(s, io)
  // TODO: check for every connection serial creation
  serial(s, io)
})

app.use(express.static(path.resolve(__dirname, './../')))
app.get(/.*/, (req, res) =>
     res.sendFile(path.resolve('index.html')),
)

// app.listen(port, /* host,*/ (err) => {
//   if (err) console.error(err)
//   console.info(`SERVER: Listening at ${port}`) // eslint-disable-line no-console
// })

http.listen(port || 3000, function onListen() {
  const address = http.address()
  console.log('Listening on: %j', address)
  console.log(' -> that probably means: http://localhost:%d', address.port)
})

