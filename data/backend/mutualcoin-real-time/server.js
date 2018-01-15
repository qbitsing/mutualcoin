'use strict'

const app = require('express')()
const debug = require('debug')('mutualcoin:realtime')
const chalk = require('chalk')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 1600
const sokcets = new Map()
io.on('connection', (socket) => {
  debug(`a new client is connected: ${socket.id}`)
  sokcets.set(socket.id, socket)
  socket.on('disconnect', () => {
    debug(`a client has been disconnected: ${socket.id}`)
    sokcets.delete(socket.id)
  })
  socket.on('suscribe', (payload) => {
    switch (payload) {
      case 'block/change/state':
        debug(`suscribing to "block/change/state" client: ${socket.id}`)
        socket.join('block/change/state')
        break;
      case 'block/earnings':
        debug(`suscribing to "block/earnings" client: ${socket.id}`)
        socket.join('block/earnings')
        break;
      default:
        break;
    }
  })
  socket.on('unsuscribe', (payload) => {
    switch (payload) {
      case 'block/change/state':
        debug(`unsuscribing to "block/change/state" client: ${socket.id}`)
        socket.leave('block/change/state')
        break;
      case 'block/earnings':
        debug(`unsuscribing to "block/earnings" client: ${socket.id}`)
        socket.leave('block/earnings')
        break;
      default:
        break;
    }
  })
  socket.on('message', (payload) => { 
    debug(`a message has come from ${socket.id}`)
    console.log(payload)
    io.to(payload.topic).emit(payload.topic, payload.body)
  })
})

server.listen(port, () => {
  console.log(`${chalk.green('[mutualcoin-real-time]')} server is running on port ${port}`)
})
