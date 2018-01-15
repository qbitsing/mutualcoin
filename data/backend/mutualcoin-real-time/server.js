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
      case 'block/earnings':
      case 'block/make/pay':
      case 'block/amount':
      case 'block/user/add':
        debug(`suscribing to "${payload}" client: ${socket.id}`)
        socket.join(payload)
        break
      default:
        break
    }
  })
  socket.on('unsuscribe', (payload) => {
    switch (payload) {
      case 'block/change/state':
      case 'block/earnings':
      case 'block/make/pay':
      case 'block/amount':
      case 'block/user/add':
        debug(`unsuscribing to "${payload}" client: ${socket.id}`)
        socket.leave(payload)
        break
      default:
        break
    }
  })
  socket.on('message', (payload) => {
    debug(`a message has come from ${socket.id}`)
    io.to(payload.topic).emit(payload.topic, payload.body)
  })
})

server.listen(port, () => {
  console.log(`${chalk.green('[mutualcoin-real-time]')} server is running on port ${port}`)
})
